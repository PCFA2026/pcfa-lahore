import { Resend } from "resend";

const FROM = process.env.FROM_EMAIL || "PCFA Lahore <info@pcfalahore.org>";
const REPLY_TO = "pcfa2026@gmail.com";
const SITE = "https://pcfalahore.org";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(key);
}

const brand = {
  blue: "#0b3d91",
  green: "#046a38",
  red: "#c8102e",
  slate: "#334155",
  light: "#f4f6fa",
};

function layout(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width" />
</head>
<body style="margin:0;padding:0;background:${brand.light};font-family:Arial,Helvetica,sans-serif;color:${brand.slate};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
    <tr>
      <td style="background:${brand.blue};padding:24px 32px;text-align:center;">
        <div style="font-size:11px;letter-spacing:2px;color:#c9a24b;text-transform:uppercase;">Pakistan - China Friendship Association</div>
        <div style="font-size:22px;font-weight:700;color:#ffffff;margin-top:6px;">PCFA Lahore</div>
      </td>
    </tr>
    <tr><td style="padding:32px;">${bodyHtml}</td></tr>
    <tr>
      <td style="padding:20px 32px;background:${brand.light};text-align:center;font-size:12px;color:#64748b;">
        <div>Pakistan-China Friendship Association (PCFA), Lahore</div>
        <div style="margin-top:4px;">Non-profit · Non-government · Voluntary organization</div>
        <div style="margin-top:8px;">
          <a href="${SITE}" style="color:${brand.blue};text-decoration:none;">${SITE}</a>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendApplicationConfirmation(to: string, name: string) {
  const html = layout(`
    <h2 style="margin:0 0 12px;font-size:20px;color:${brand.blue};">Thank you, ${name}!</h2>
    <p style="line-height:1.7;margin:0 0 16px;">We have received your membership application to the Pakistan-China Friendship Association (PCFA), Lahore. Our team will review it and get in touch with you soon.</p>
    <p style="line-height:1.7;margin:0 0 24px;">If you have any questions, simply reply to this email.</p>
    <p style="margin:0;">Warm regards,<br/><strong>The PCFA Lahore Team</strong></p>
  `);
  return getResend().emails.send({ from: FROM, to, subject: "PCFA Lahore - Application Received", html, replyTo: REPLY_TO });
}

export async function sendApprovalEmail(to: string, name: string) {
  const html = layout(`
    <h2 style="margin:0 0 12px;font-size:20px;color:${brand.green};">Welcome to PCFA Lahore!</h2>
    <p style="line-height:1.7;margin:0 0 16px;">Dear ${name},</p>
    <p style="line-height:1.7;margin:0 0 16px;">We are delighted to inform you that your membership application has been <strong>approved</strong>. You are now an official member of the Pakistan-China Friendship Association (PCFA), Lahore.</p>
    <p style="line-height:1.7;margin:0 0 24px;">We look forward to your participation in our academic, cultural and people-to-people initiatives.</p>
    <p style="margin:0;">Warm regards,<br/><strong>The PCFA Lahore Team</strong></p>
  `);
  return getResend().emails.send({ from: FROM, to, subject: "PCFA Lahore - Membership Approved", html, replyTo: REPLY_TO });
}

export async function sendNewsletter(
  to: string[],
  subject: string,
  messageHtml: string
) {
  const html = layout(`
    <h2 style="margin:0 0 12px;font-size:20px;color:${brand.blue};">${subject}</h2>
    <div style="line-height:1.7;">${messageHtml}</div>
    <p style="margin:24px 0 0;font-size:12px;color:#64748b;">You are receiving this because you are a member of PCFA Lahore.</p>
  `);
  return getResend().emails.send({
    from: FROM,
    to: to,
    subject: `PCFA Lahore - ${subject}`,
    html,
    replyTo: REPLY_TO,
  });
}

