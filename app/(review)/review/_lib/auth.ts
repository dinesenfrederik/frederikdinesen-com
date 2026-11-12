import crypto from 'crypto';
import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'fdsl_review';
const SESSION_DAYS = 30;

/** The session value is derived from the password, so changing REVIEW_PASSWORD logs everyone out. */
function sessionToken(): string | null {
  const password = process.env.REVIEW_PASSWORD;
  if (!password) return null;
  return crypto.createHmac('sha256', password).update('fdsl-review-session-v1').digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

export function isConfigured(): boolean {
  return Boolean(process.env.REVIEW_PASSWORD && process.env.GITHUB_TOKEN);
}

export async function isAuthed(): Promise<boolean> {
  const expected = sessionToken();
  if (!expected) return false;
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  return Boolean(value && safeEqual(value, expected));
}

/** Throws unless the request carries a valid session. Call at the top of every server action. */
export async function requireAuth(): Promise<void> {
  if (!(await isAuthed())) throw new Error('Du er ikke logget ind. Genindlæs siden og log ind igen.');
}

export async function checkPasswordAndStartSession(password: string): Promise<boolean> {
  const expected = process.env.REVIEW_PASSWORD;
  const token = sessionToken();
  if (!expected || !token || !safeEqual(password, expected)) return false;
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/review',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
  return true;
}

export async function endSession(): Promise<void> {
  (await cookies()).delete({ name: SESSION_COOKIE, path: '/review' });
}
