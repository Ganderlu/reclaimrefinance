"use server";

import { adminDb, adminConfigured } from "@/lib/firebase-admin";
import { createUploadSignature } from "@/lib/cloudinary";
import type { ClaimData, ScamCategory } from "@/lib/claim-types";

/**
 * Returns a short-lived signature so the browser can upload a supporting
 * document directly to Cloudinary. Returns null when Cloudinary is not
 * configured, letting the client fall back gracefully.
 */
export async function signCloudinaryUpload(draftId: string) {
  return createUploadSignature(draftId);
}

const categoryLabels: Record<string, string> = {
  crypto: "Cryptocurrency Fraud",
  investment: "Investment Fraud",
  "bank-transfer": "Bank Transfer Fraud",
  purchase: "Purchase & Invoice Fraud",
  romance: "Romance & Social Engineering",
  "account-takeover": "Account Takeover Fraud",
  wire: "International Wire Transfer Fraud",
  other: "Other Financial Scams",
};

export type SubmitResult =
  | { ok: true; data: { referenceNumber: string; createdAt: string; category: string } }
  | { ok: false; error: string };

function serverValidate(data: ClaimData): string | null {
  if (!data.personal.firstName?.trim()) return "First name is required";
  if (!data.personal.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personal.email))
    return "Valid email is required";
  if (!data.scam.category) return "Scam category is required";
  if (!data.financial.amountLost) return "Amount lost is required";
  if (!data.consent.accurate || !data.consent.terms || !data.consent.authorize)
    return "All consent checkboxes must be accepted";
  return null;
}

export async function submitClaim(data: ClaimData): Promise<SubmitResult> {
  // Idempotency: prevent duplicate rapid submissions via a simple in-memory
  // key; production should use a durable store (e.g. Redis / Firestore lock).
  const idempotencyKey =
    data.personal.email + "|" + data.scam.category + "|" + data.financial.amountLost;

  const validationError = serverValidate(data);
  if (validationError) return { ok: false, error: validationError };

  const year = new Date().getFullYear();
  let referenceNumber = `RR-${year}-${String(Math.floor(Math.random() * 900000) + 100000)}`;
  const createdAt = new Date().toISOString();
  const categoryLabel = categoryLabels[data.scam.category as ScamCategory] || data.scam.category;

  if (!adminConfigured || !adminDb) {
    console.error("Claim submission failed: Firebase Admin is not configured.");
    return {
      ok: false,
      error: "We could not save your claim right now. Please try again later.",
    };
  }

  try {
    // Atomic counter for safe sequential reference numbers
    const counterRef = adminDb.collection("counters").doc("claims");
    await adminDb.runTransaction(async (tx) => {
      const snap = await tx.get(counterRef);
      const next = (snap.data()?.count ?? 0) + 1;
      tx.set(counterRef, { count: next }, { merge: true });
      referenceNumber = `RR-${year}-${String(next).padStart(6, "0")}`;
    });

    // Idempotency check
    const existing = await adminDb
      .collection("claims")
      .where("idempotencyKey", "==", idempotencyKey)
      .limit(1)
      .get();
    if (!existing.empty) {
      const first = existing.docs[0].data();
      return {
        ok: true,
        data: {
          referenceNumber: first.referenceNumber,
          createdAt: first.createdAt,
          category: categoryLabel,
        },
      };
    }

    await adminDb.collection("claims").add({
      referenceNumber,
      userId: null,
      personalInformation: data.personal,
      scamDetails: data.scam,
      financialDetails: data.financial,
      supportingDocuments: data.documents.map((d) => ({
        name: d.name,
        size: d.size,
        type: d.type,
        category: d.category,
        publicId: d.publicId ?? null,
        secureUrl: d.secureUrl ?? null,
        resourceType: d.resourceType ?? null,
        format: d.format ?? null,
      })),
      status: "Submitted",
      assignedOfficer: null,
      idempotencyKey,
      createdAt,
      updatedAt: createdAt,
    });

    // Surface the new claim in the administrator dashboard.
    await Promise.allSettled([
      adminDb.collection("notifications").add({
        title: "New claim submitted",
        message: `${data.personal.firstName} ${data.personal.lastName} submitted ${referenceNumber} (${categoryLabel}).`,
        type: "claim",
        read: false,
        link: "/admin/claims",
        createdAt,
      }),
      adminDb.collection("auditLogs").add({
        actorId: "system",
        actorEmail: data.personal.email,
        action: "Submitted a new claim",
        target: referenceNumber,
        targetType: "claim",
        createdAt,
      }),
    ]);

    // Send confirmation email via Resend if configured
    await sendConfirmationEmails({
      email: data.personal.email,
      name: `${data.personal.firstName} ${data.personal.lastName}`,
      referenceNumber,
      categoryLabel,
    });
  } catch (err) {
    console.error("Claim submission failed:", err);
    return {
      ok: false,
      error: "We could not save your claim. Please try again later.",
    };
  }

  return {
    ok: true,
    data: { referenceNumber, createdAt, category: categoryLabel },
  };
}

async function sendConfirmationEmails({
  email,
  name,
  referenceNumber,
  categoryLabel,
}: {
  email: string;
  name: string;
  referenceNumber: string;
  categoryLabel: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || "claims@reclaimrefinance.com";
  const adminEmail = process.env.RESEND_ADMIN_EMAIL;
  if (!apiKey) return;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    // Customer confirmation
    await resend.emails.send({
      from: `ReclaimRefinance <${from}>`,
      to: email,
      subject: `Your claim ${referenceNumber} has been received`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #071D3A;">Thank you, ${name}.</h2>
          <p>Your claim has been received and is now under review by our team.</p>
          <p><strong>Claim Reference:</strong> ${referenceNumber}</p>
          <p><strong>Category:</strong> ${categoryLabel}</p>
          <p>We will contact you using your preferred contact method with updates.
          Recovery is not guaranteed and each case is assessed individually.</p>
          <p style="margin-top: 24px; font-size: 12px; color: #888;">
            ReclaimRefinance — Recover • Refinance • Move Forward.
          </p>
        </div>
      `,
    });

    // Admin notification
    if (adminEmail) {
      await resend.emails.send({
        from: `ReclaimRefinance <${from}>`,
        to: adminEmail,
        subject: `New claim submitted: ${referenceNumber}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #071D3A;">New Claim Submitted</h2>
            <p><strong>Reference:</strong> ${referenceNumber}</p>
            <p><strong>Applicant:</strong> ${name} (${email})</p>
            <p><strong>Category:</strong> ${categoryLabel}</p>
          </div>
        `,
      });
    }
  } catch (err) {
    console.error("Resend email failed:", err);
  }
}
