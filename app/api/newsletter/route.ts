import { db } from '@/lib/db';
import { sendNewsletterConfirmation } from '@/lib/email';
import { created, badRequest, conflict, serverError } from '@/lib/api';

// POST /api/newsletter — subscribe
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return badRequest('A valid email address is required.');
    }

    const existing = await db.newsletterSubscriber.findUnique({ where: { email } });
    if (existing) {
      // Re-subscribe if they had previously unsubscribed
      if (existing.unsubscribedAt) {
        await db.newsletterSubscriber.update({
          where: { email },
          data: { unsubscribedAt: null },
        });
        return created({ message: 'Welcome back! You have been resubscribed.' });
      }
      return conflict('This email is already subscribed.');
    }

    await db.newsletterSubscriber.create({ data: { email } });
    sendNewsletterConfirmation(email).catch(console.error);

    return created({ message: 'Successfully subscribed to the TASA newsletter.' });
  } catch (err) {
    return serverError(err);
  }
}

// GET /api/newsletter/unsubscribe?email=... — one-click unsubscribe
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) return badRequest('Email is required.');

    await db.newsletterSubscriber.updateMany({
      where: { email },
      data: { unsubscribedAt: new Date() },
    });

    return new Response(
      `<html><body style="font-family:sans-serif;text-align:center;padding:60px">
        <h1>Unsubscribed</h1>
        <p>You have been removed from the TASA newsletter.</p>
        <a href="https://mytasa.org">Return to TASA</a>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  } catch (err) {
    return serverError(err);
  }
}
