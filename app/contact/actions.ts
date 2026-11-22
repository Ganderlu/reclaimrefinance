"use server";

/**
 * Receives a message from the public contact form and forwards it to the
 * inbox configured via CONTACT_EMAIL (falls back to the internal address)
 * via Resend. Returns a serializable result so the client can render inline
 * success / error feedback.
 */

export type ContactFormState = {
  ok: boolean;
  message: string;
  fallbackHref?: string;
} | null;

/** Inbox that actually receives contact-form submissions. */
const RECIPIENT = process.env.CONTACT_EMAIL || "reclaimrefinance@hotmail.com";

/** Public support address shown to visitors if delivery fails. */
const SUPPORT_EMAIL = "reclaimrefinance@hotmail.com";

/** Human-readable timestamp for the notification email. */
function formatReceivedAt(date: Date): string {
  const timeZone = process.env.NEXT_PUBLIC_DISPLAY_TIMEZONE || "UTC";
  try {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone,
    }).format(date);
  } catch {
    return date.toISOString();
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

/** Keep subjects single-line and free of header-injection characters. */
function toSafeSubject(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function createFallbackHref(name: string, email: string, message: string): string {
  const subject = toSafeSubject(`Website enquiry from ${name}`);
  const body = [`Name: ${name}`, `Email: ${email}`, "", "Message:", message].join("\n");
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function deliveryUnavailable(name: string, email: string, message: string): ContactFormState {
  return {
    ok: false,
    message: `We couldn't send your message automatically. Use the button below to email it to ${SUPPORT_EMAIL}.`,
    fallbackHref: createFallbackHref(name, email, message),
  };
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name) return { ok: false, message: "Please enter your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { ok: false, message: "Please enter a valid email address." };
  if (message.length < 10)
    return { ok: false, message: "Please provide a little more detail in your message." };

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || "contact@us.reclaimrefinance.com";
  if (!apiKey) {
    console.error("Contact form failed: RESEND_API_KEY is not configured.");
    return deliveryUnavailable(name, email, message);
  }

  const receivedAt = formatReceivedAt(new Date());
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);
  const replyHref = `mailto:${encodeURIComponent(email)}`;

  const html = `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0; padding:0; background-color:#F3F7FC;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F3F7FC; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%; max-width:600px; background-color:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #e2e8f0; font-family:Arial, Helvetica, sans-serif;">
            <tr>
              <td style="background-color:#071D3A; padding:24px 32px;">
                <span style="color:#ffffff; font-size:18px; font-weight:bold; letter-spacing:0.3px;">ReclaimRefinance</span>
                <span style="display:block; color:#08B99A; font-size:12px; font-weight:bold; letter-spacing:1.5px; text-transform:uppercase; margin-top:6px;">Website Enquiry</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 4px; color:#071D3A; font-size:20px; font-weight:bold;">New contact message</p>
                <p style="margin:0 0 24px; color:#64748b; font-size:14px;">Received ${escapeHtml(receivedAt)}</p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                  <tr>
                    <td style="padding:10px 0; border-bottom:1px solid #eef2f7; color:#64748b; font-size:13px; width:110px;">Name</td>
                    <td style="padding:10px 0; border-bottom:1px solid #eef2f7; color:#071D3A; font-size:15px; font-weight:bold;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#64748b; font-size:13px;">Email</td>
                    <td style="padding:10px 0; font-size:15px;"><a href="${replyHref}" style="color:#08B99A; text-decoration:none; font-weight:bold;">${safeEmail}</a></td>
                  </tr>
                </table>

                <p style="margin:0 0 8px; color:#64748b; font-size:13px; text-transform:uppercase; letter-spacing:1px;">Message</p>
                <div style="border-left:3px solid #08B99A; background-color:#F3F7FC; border-radius:0 8px 8px 0; padding:16px 20px; color:#1e293b; font-size:15px; line-height:1.6; white-space:pre-wrap;">${safeMessage}</div>

                <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                  <tr>
                    <td style="border-radius:9999px; background-color:#08B99A;">
                      <a href="${replyHref}" style="display:inline-block; padding:12px 28px; color:#ffffff; font-size:14px; font-weight:bold; text-decoration:none; border-radius:9999px;">Reply to ${safeName}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background-color:#F3F7FC; padding:20px 32px; border-top:1px solid #e2e8f0;">
                <p style="margin:0; color:#94a3b8; font-size:12px; line-height:1.6;">This message was submitted through the ReclaimRefinance contact form. Reply directly to this email to respond to ${safeName}.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    "New contact message — ReclaimRefinance",
    `Received: ${receivedAt}`,
    "",
    `Name:  ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
    "",
    "---",
    "Reply directly to this email to respond.",
  ].join("\n");

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: `ReclaimRefinance <${from}>`,
      to: RECIPIENT,
      replyTo: email,
      subject: toSafeSubject(`New contact message from ${name}`),
      html,
      text,
    });

    if (error) {
      console.error("Contact form Resend error:", error);
      return deliveryUnavailable(name, email, message);
    }

    return {
      ok: true,
      message: "Thanks — your message is on its way. We'll get back to you shortly.",
    };
  } catch (err) {
    console.error("Contact form failed:", err);
    return deliveryUnavailable(name, email, message);
  }
}
