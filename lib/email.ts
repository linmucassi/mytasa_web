import nodemailer from 'nodemailer';

// Transporter is created lazily so missing env vars only error at send time.
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const FROM = process.env.EMAIL_FROM ?? 'TASA <noreply@mytasa.org>';

// ─── Send helpers ────────────────────────────────────────────────────────────

export async function sendWelcomeEmail(to: string, firstName: string) {
  await createTransporter().sendMail({
    from: FROM,
    to,
    subject: 'Welcome to TASA — Evolution Through Christ',
    html: `
      <h1>Welcome, ${firstName}!</h1>
      <p>Your TASA account has been created. We're thrilled to have you join our community.</p>
      <p>
        <strong>Next step:</strong> Find your nearest branch and attend a meeting.
        Visit <a href="https://mytasa.org">mytasa.org</a> to explore upcoming events.
      </p>
      <p><em>"I can do all things through Christ who strengthens me." — Philippians 4:13</em></p>
      <p>God bless,<br/>The TASA Team</p>
    `,
  });
}

export async function sendRSVPConfirmation(
  to: string,
  name: string,
  eventTitle: string,
  eventDate: string,
  eventLocation: string
) {
  await createTransporter().sendMail({
    from: FROM,
    to,
    subject: `RSVP Confirmed — ${eventTitle}`,
    html: `
      <h1>You're registered, ${name}!</h1>
      <p>Your RSVP for <strong>${eventTitle}</strong> has been confirmed.</p>
      <ul>
        <li><strong>Date:</strong> ${eventDate}</li>
        <li><strong>Venue:</strong> ${eventLocation}</li>
      </ul>
      <p>We look forward to seeing you there. Stay blessed!</p>
      <p>— The TASA Team</p>
    `,
  });
}

export async function sendContactAcknowledgement(
  to: string,
  name: string,
  subject: string
) {
  await createTransporter().sendMail({
    from: FROM,
    to,
    subject: `We received your message — ${subject}`,
    html: `
      <p>Hi ${name},</p>
      <p>Thank you for reaching out to TASA. We've received your message regarding
         "<strong>${subject}</strong>" and will respond within 2 business days.</p>
      <p>God bless,<br/>The TASA Team</p>
    `,
  });
}

export async function sendContactNotificationToTeam(data: {
  name: string;
  email: string;
  department?: string;
  subject: string;
  message: string;
}) {
  const team = process.env.CONTACT_NOTIFICATION_EMAIL ?? 'info@mytasa.org';
  await createTransporter().sendMail({
    from: FROM,
    to: team,
    replyTo: data.email,
    subject: `[Contact Form] ${data.subject}`,
    html: `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Department:</strong> ${data.department ?? 'General'}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <hr/>
      <p>${data.message.replace(/\n/g, '<br/>')}</p>
    `,
  });
}

export async function sendNewsletterConfirmation(to: string) {
  await createTransporter().sendMail({
    from: FROM,
    to,
    subject: 'You\'re subscribed to the TASA Newsletter',
    html: `
      <p>You're now subscribed to TASA updates, devotionals, and event announcements.</p>
      <p>
        To unsubscribe at any time, click
        <a href="https://mytasa.org/api/newsletter/unsubscribe?email=${encodeURIComponent(to)}">here</a>.
      </p>
      <p>— The TASA Team</p>
    `,
  });
}
