import { clearAuthCookie } from '@/lib/auth';
import { ok } from '@/lib/api';

export async function POST() {
  const response = ok({ message: 'Logged out.' });
  return clearAuthCookie(response);
}
