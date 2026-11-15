import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { ok, created, badRequest, forbidden, serverError } from '@/lib/api';

// GET /api/events — public list of events
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const province = searchParams.get('province');
    const upcoming = searchParams.get('upcoming');

    const now = new Date();

    const events = await db.event.findMany({
      where: {
        published: true,
        ...(category ? { category: category as import('@/app/generated/prisma').EventCategory } : {}),
        ...(province ? { province } : {}),
        ...(upcoming === 'true'
          ? { date: { gte: now } }
          : upcoming === 'false'
          ? { date: { lt: now } }
          : {}),
      },
      orderBy: { date: upcoming === 'false' ? 'desc' : 'asc' },
      select: {
        id: true,
        title: true,
        date: true,
        endDate: true,
        time: true,
        location: true,
        province: true,
        category: true,
        description: true,
        _count: { select: { rsvps: true } },
      },
    });

    return ok(events);
  } catch (err) {
    return serverError(err);
  }
}

// POST /api/events — admin only: create event
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return forbidden();
    if (user.role !== 'ADMIN') return forbidden('Only admins can create events.');

    const body = await request.json();
    const { title, date, endDate, time, location, province, category, description } = body;

    if (!title || !date || !time || !location || !province || !category || !description) {
      return badRequest('All event fields are required.');
    }

    const event = await db.event.create({
      data: { title, date: new Date(date), endDate: endDate ? new Date(endDate) : null, time, location, province, category, description },
    });

    return created(event);
  } catch (err) {
    return serverError(err);
  }
}
