import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { signToken, setAuthCookie } from '@/lib/auth';
import { sendWelcomeEmail } from '@/lib/email';
import { badRequest, conflict, created, serverError } from '@/lib/api';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password, phone, institution, province, yearOfStudy } = body;

    if (!firstName || !lastName || !email || !password) {
      return badRequest('firstName, lastName, email and password are required.');
    }
    if (password.length < 8) {
      return badRequest('Password must be at least 8 characters.');
    }

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return conflict('An account with this email already exists.');
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await db.user.create({
      data: { firstName, lastName, email, password: hashed, phone, institution, province, yearOfStudy },
    });

    // Fire-and-forget welcome email — don't block the response
    sendWelcomeEmail(user.email, user.firstName).catch(console.error);

    const token = await signToken({
      sub: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
    });

    const response = created({
      user: { id: user.id, email: user.email, firstName: user.firstName, role: user.role },
    });
    return setAuthCookie(response, token);
  } catch (err) {
    return serverError(err);
  }
}
