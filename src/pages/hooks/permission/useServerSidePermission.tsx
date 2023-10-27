/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import {
  redirectToLogin,
  redirectToUnauthorized,
} from 'pages/constants/redirects';

export const useServerSidePermission = async (context: any) => {
  const { req } = context;
  const user = req.session.get('user');
  const cookie = context.req.headers.cookie;

  if (!user) return redirectToLogin;

  try {
    const { data: userData } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`,
      {
        headers: { cookie },
      }
    );

    if (userData.isLoggedIn !== true) return redirectToLogin;

    if (userData.role !== 'admin') return redirectToUnauthorized;

    return {
      props: {
        user: userData,
      },
    };
  } catch (error) {
    return redirectToUnauthorized;
  }
};