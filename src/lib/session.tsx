/* eslint-disable @typescript-eslint/no-explicit-any */
import { withIronSession } from 'next-iron-session';

export default function withSession(handler: any) {
  return withIronSession(handler, {
    cookieName: 'root_auth_session',
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === 'production',
    },
  });
}
