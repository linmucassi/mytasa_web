import type { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { sendRSVPConfirmation } from '@/lib/email';
import { created, badRequest, conflict, notFound, serverError } from '@/lib/api';

// POST /api/events/[id]/rsvp — RSVP for an event (guest or authenticated)
export async function POST(request: NextRequest, ctx: RouteContext<'/api/events/[id]/rsvp'>) {
  try {
    const { id } = await ctx.params;
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return badRequest('Name and email are required.');
    }

    const event = await db.event.findUnique({ where: { id, published: true } });
    if (!event) return notFound('Event not found.');

    // Check if date has passed
    if (event.date < new Date()) {
      return badRequest('This event has already taken place.');
    }

    const currentUser = await getCurrentUser();

    try {
      const rsvp = await db.eventRSVP.create({
        data: {
          eventId: id,
          name,
          email,
          userId: currentUser?.sub ?? null,
        },
      });

      // Fire-and-forget confirmation email
      const dateStr = event.date.toLocaleDateString('en-ZA', {
        day: 'numeric', month: 'long', year: 'numeric',
      });
      sendRSVPConfirmation(email, name, event.title, dateStr, event.location).catch(console.error);

      return created({ rsvp: { id: rsvp.id, eventId: rsvp.eventId, name: rsvp.name } });
    } catch (e: unknown) {
      // Unique constraint — already RSVPed
      if ((e as { code?: string }).code === 'P2002') {
        return conflict('You have already RSVPed for this event.');
      }
      throw e;
    }
  } catch (err) {
    return serverError(err);
  }
}
