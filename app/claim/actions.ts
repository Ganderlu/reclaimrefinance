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
  | {
      ok: true;
      data: {
        referenceNumber: string;
        createdAt: string;
        category: string;
        emailSent: boolean;
      };
    }
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
  const fullName = `${data.personal.firstName} ${data.personal.lastName}`.trim();

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
      const existingDoc = existing.docs[0];
      const first = existingDoc.data();
      const existingReference = String(first.referenceNumber ?? referenceNumber);
      const existingCreatedAt = String(first.createdAt ?? createdAt);
      const storedCategory =
        categoryLabels[String(first.scamDetails?.category ?? data.scam.category)] ??
        categoryLabel;
      let emailSent = Boolean(first.confirmationEmailSentAt);

      if (!emailSent) {
        emailSent = await sendConfirmationEmails({
          email: data.personal.email.trim(),
          name: fullName,
          referenceNumber: existingReference,
          categoryLabel: storedCategory,
          createdAt: existingCreatedAt,
          notifyAdmin: false,
        });
        if (emailSent) {
          await existingDoc.ref
            .update({ confirmationEmailSentAt: new Date().toISOString() })
            .catch((err) => console.error("Could not record claim email delivery:", err));
        }
      }

      return {
        ok: true,
        data: {
          referenceNumber: existingReference,
          createdAt: existingCreatedAt,
          category: storedCategory,
          emailSent,
        },
      };
    }

    const claimRef = await adminDb.collection("claims").add({
      referenceNumber,
      userId: null,
      personalInformation: {
        ...data.personal,
        preferredContact: "email",
      },
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
    const emailSent = await sendConfirmationEmails({
      email: data.personal.email.trim(),
      name: fullName,
      referenceNumber,
      categoryLabel,
      createdAt,
    });
    if (emailSent) {
      await claimRef
        .update({ confirmationEmailSentAt: new Date().toISOString() })
        .catch((err) => console.error("Could not record claim email delivery:", err));
    }

    return {
      ok: true,
      data: { referenceNumber, createdAt, category: categoryLabel, emailSent },
    };
  } catch (err) {
    console.error("Claim submission failed:", err);
    return {
      ok: false,
      error: "We could not save your claim. Please try again later.",
    };
  }

}

async function sendConfirmationEmails({
  email,
  name,
  referenceNumber,
  categoryLabel,
  createdAt,
  notifyAdmin = true,
}: {
  email: string;
  name: string;
  referenceNumber: string;
  categoryLabel: string;
  createdAt: string;
  notifyAdmin?: boolean;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || "contact@us.reclaimrefinance.com";
  const adminEmail = process.env.RESEND_ADMIN_EMAIL;
  if (!apiKey) {
    console.error("Claim confirmation email was not sent: RESEND_API_KEY is not configured.");
    return false;
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const safeName = escapeHtml(name);
    const safeReference = escapeHtml(referenceNumber);
    const safeCategory = escapeHtml(categoryLabel);
    const submittedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeZone: "UTC",
    }).format(new Date(createdAt));
    const safeSubmittedDate = escapeHtml(submittedDate);
    const supportEmail = "reclaimrefinance@hotmail.com";

    const customerEmail = await resend.emails.send({
      from: `ReclaimRefinance <${from}>`,
      to: email,
      replyTo: supportEmail,
      subject: `We have received your claim | ${referenceNumber}`,
      html: buildClaimConfirmationHtml({
        safeName,
        safeReference,
        safeCategory,
        safeSubmittedDate,
        supportEmail,
      }),
      text: [
        "RECLAIMREFINANCE | CLAIM RECEIPT",
        "",
        `Dear ${name},`,
        "",
        "Thank you for contacting ReclaimRefinance. We have received your claim and it is awaiting an initial review by our team.",
        "",
        `Claim reference: ${referenceNumber}`,
        `Case type: ${categoryLabel}`,
        `Date received: ${submittedDate} (UTC)`,
        "",
        "What happens next",
        "Our team will review the information you provided and contact you at this email address if we need anything further. Please keep your reference number for future correspondence.",
        "",
        "For your security, never email passwords, verification codes, or full payment card details. A submission does not guarantee recovery; every case is assessed individually.",
        "",
        `Questions? Contact us at ${supportEmail}.`,
        "",
        "Kind regards,",
        "ReclaimRefinance Support Team",
        "Recover. Reclaim. Move Forward.",
      ].join("\n"),
    });
    if (customerEmail.error) {
      console.error("Claim confirmation email failed:", customerEmail.error);
      return false;
    }

    if (notifyAdmin && adminEmail) {
      try {
        const adminResult = await resend.emails.send({
          from: `ReclaimRefinance <${from}>`,
          to: adminEmail,
          replyTo: email,
          subject: `New claim submitted: ${referenceNumber}`,
          html: `
            <p><strong>New claim submitted</strong></p>
            <p>Reference: ${safeReference}<br />
            Applicant: ${safeName} (${escapeHtml(email)})<br />
            Category: ${safeCategory}</p>
          `,
          text: [
            "New claim submitted",
            `Reference: ${referenceNumber}`,
            `Applicant: ${name} (${email})`,
            `Category: ${categoryLabel}`,
          ].join("\n"),
        });
        if (adminResult.error) {
          console.error("Claim admin notification failed:", adminResult.error);
        }
      } catch (err) {
        console.error("Claim admin notification failed:", err);
      }
    }
    return true;
  } catch (err) {
    console.error("Resend email failed:", err);
    return false;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildClaimConfirmationHtml({
  safeName,
  safeReference,
  safeCategory,
  safeSubmittedDate,
  supportEmail,
}: {
  safeName: string;
  safeReference: string;
  safeCategory: string;
  safeSubmittedDate: string;
  supportEmail: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0; padding:0; background-color:#F3F7FC;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">Your claim has been received. Keep this email for your records.</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F3F7FC; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%; max-width:600px; background-color:#ffffff; border:1px solid #e2e8f0; border-radius:16px; overflow:hidden; font-family:Arial, Helvetica, sans-serif;">
            <tr>
              <td style="background-color:#071D3A; padding:24px 32px;">
                <div style="color:#ffffff; font-size:19px; font-weight:bold; letter-spacing:0.2px;">ReclaimRefinance</div>
                <div style="margin-top:6px; color:#08B99A; font-size:11px; font-weight:bold; letter-spacing:1.5px;">CLAIM RECEIPT</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 12px; color:#071D3A; font-size:22px; line-height:1.3; font-weight:bold;">We have received your claim</p>
                <p style="margin:0 0 24px; color:#475569; font-size:15px; line-height:1.7;">Dear ${safeName}, thank you for contacting ReclaimRefinance. Your information has been received and is awaiting an initial review by our team.</p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #dbe7f1; border-radius:12px; background-color:#F3F7FC; margin-bottom:24px;">
                  <tr><td style="padding:18px 20px 8px; color:#64748b; font-size:11px; font-weight:bold; letter-spacing:1px; text-transform:uppercase;">Claim reference</td></tr>
                  <tr><td style="padding:0 20px 16px; color:#071D3A; font-size:22px; font-weight:bold; letter-spacing:0.5px;">${safeReference}</td></tr>
                  <tr><td style="padding:12px 20px; border-top:1px solid #dbe7f1; color:#64748b; font-size:13px;">Case type <span style="float:right; color:#071D3A; font-weight:bold;">${safeCategory}</span></td></tr>
                  <tr><td style="padding:0 20px 16px; color:#64748b; font-size:13px;">Date received <span style="float:right; color:#071D3A; font-weight:bold;">${safeSubmittedDate} UTC</span></td></tr>
                </table>

                <p style="margin:0 0 8px; color:#071D3A; font-size:15px; font-weight:bold;">What happens next</p>
                <p style="margin:0 0 22px; color:#475569; font-size:14px; line-height:1.7;">Our team will review the information you provided and contact you at this email address if we need anything further. Please keep your reference number for future correspondence.</p>

                <div style="border-left:3px solid #08B99A; background-color:#f8fafc; padding:14px 16px; color:#475569; font-size:12px; line-height:1.7;">
                  <strong style="color:#071D3A;">Security note:</strong> Never email passwords, verification codes, or full payment card details. Submitting a claim does not guarantee recovery; every case is assessed individually.
                </div>
                <p style="margin:22px 0 0; color:#475569; font-size:14px; line-height:1.7;">Questions? Email us at <a href="mailto:${supportEmail}" style="color:#087f70; font-weight:bold; text-decoration:none;">${supportEmail}</a>.</p>
                <p style="margin:20px 0 0; color:#071D3A; font-size:14px; line-height:1.7;">Kind regards,<br /><strong>ReclaimRefinance Support Team</strong></p>
              </td>
            </tr>
            <tr>
              <td style="background-color:#F3F7FC; padding:18px 32px; border-top:1px solid #e2e8f0;">
                <p style="margin:0; color:#64748b; font-size:11px; line-height:1.6;">ReclaimRefinance · Recover. Reclaim. Move Forward.</p>
                <p style="margin:5px 0 0; color:#94a3b8; font-size:11px; line-height:1.6;">This is an automated confirmation of your claim submission. Please retain it for your records.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
