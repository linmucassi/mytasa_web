import { db } from '@/lib/db';
import { sendContactAcknowledgement, sendContactNotificationToTeam } from '@/lib/email';
import { created, badRequest, serverError } from '@/lib/api';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, department, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return badRequest('name, email, subject and message are required.');
    }

    const msg = await db.contactMessage.create({
      data: { name, email, department, subject, message },
    });

    // Both emails fire-and-forget so the API responds immediately
    sendContactAcknowledgement(email, name, subject).catch(console.error);
    sendContactNotificationToTeam({ name, email, department, subject, message }).catch(console.error);

    return created({ id: msg.id, message: 'Your message has been received.' });
  } catch (err) {
    return serverError(err);
  }
}
