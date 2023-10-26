/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

// Verifica que los redirects estén bien configurados
export const redirectToLogin = {
  redirect: {
    destination: '/login',
    permanent: false,
  },
};

export const redirectToUnauthorized = {
  redirect: {
    destination: '/',
    permanent: false,
  },
};

export const getUserProps = async (context: any) => {
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

    return {
      props: {
        user: userData,
      },
    };
  } catch (error) {
    console.error('Error fetching user data:', error); // Log para el error
    return redirectToUnauthorized;
  }
};
