import type { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, notFound, serverError } from '@/lib/api';

// GET /api/events/[id] — public single event with RSVP count
export async function GET(_req: NextRequest, ctx: RouteContext<'/api/events/[id]'>) {
  try {
    const { id } = await ctx.params;

    const event = await db.event.findUnique({
      where: { id, published: true },
      include: { _count: { select: { rsvps: true } } },
    });

    if (!event) return notFound('Event not found.');
    return ok(event);
  } catch (err) {
    return serverError(err);
  }
}
