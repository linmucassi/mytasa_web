import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { signToken, setAuthCookie } from '@/lib/auth';
import { badRequest, unauthorized, ok, serverError } from '@/lib/api';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return badRequest('Email and password are required.');
    }

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return unauthorized('Invalid email or password.');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return unauthorized('Invalid email or password.');
    }

    const token = await signToken({
      sub: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
    });

    const response = ok({
      user: { id: user.id, email: user.email, firstName: user.firstName, role: user.role },
    });
    return setAuthCookie(response, token);
  } catch (err) {
    return serverError(err);
  }
}
