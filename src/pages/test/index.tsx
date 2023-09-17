/* eslint-disable @typescript-eslint/no-explicit-any */
import withSession from 'lib/session'; // Asegúrate de reemplazar con la ruta correcta
import React from 'react';

function Index(props: any) {
  return <div>Bienvenido, {props.user.type}</div>;
}

export const getServerSideProps = withSession(async function (context: any) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const { req } = context;
  const user = req.session.get('user');
  const cookie = context.req.headers.cookie;

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const userRes = await fetch(`${apiUrl}/api/auth/user`, {
    headers: {
      cookie: cookie,
    },
  });

  if (userRes.ok) {
    const userData = await userRes.json();

    if (userData.isLoggedIn === false) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    if (userData.type !== 'admin') {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    return {
      props: {
        user,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
});

export default Index;
