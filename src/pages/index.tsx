/* eslint-disable @typescript-eslint/no-explicit-any */
import { useServerSideLogin } from 'hooks/permission/useServerSideLogin';
import withSession from 'lib/session';
import Link from 'next/link';
import React from 'react';

interface User {
  type: string;
}

interface IndexProps {
  user: User;
}

function Index({ user }: IndexProps) {
  console.log(user);
  const isAuthorized = user.type === 'cashier' || user.type === 'admin';

  return (
    <div className='flex h-screen flex-col md:h-[90vh] md:flex-row'>
      <div
        className={`background-registerProduct ${
          !isAuthorized ? 'flex-1' : ''
        }`}
      >
        <Link
          href='/product/sell'
          className='flex h-full flex-col items-center justify-center gap-1 text-center'
        >
          <h1>LISTA</h1>
          <h1>PRODUCTOS</h1>
        </Link>
      </div>

      {isAuthorized && (
        <div className='background-listProduct flex-1'>
          <Link
            href='/product/new'
            className='flex h-full flex-col items-center justify-center gap-1 text-center'
          >
            <h1>REGISTRO</h1>
            <h1>PRODUCTOS</h1>
          </Link>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = withSession(useServerSideLogin);

export default Index;
