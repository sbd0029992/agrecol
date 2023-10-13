/* eslint-disable @typescript-eslint/no-explicit-any */
import { IronSessionProps } from 'interface/type';
import { withIronSession } from 'next-iron-session';

const ironSessionOptions: IronSessionProps = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'root_auth_session',
};

const authMiddleware = (handler: any) =>
  withIronSession(async (req: any, res: any) => {
    const userAgent = req.headers['user-agent'];
    const isBrowser = /Mozilla/.test(userAgent);
    const referer = req.headers['referer'];
    const isFromFrontendApp =
      referer && referer.startsWith(process.env.NEXT_PUBLIC_API_URL);

    if (isBrowser && !isFromFrontendApp) {
      res.writeHead(302, { Location: '/' });
      res.end();
      return;
    }

    return handler(req, res);
  }, ironSessionOptions);

export default authMiddleware;
