/* eslint-disable @typescript-eslint/no-explicit-any */
import withSession from 'lib/session';
import Link from 'next/link';
import { useServerSideLogin } from 'pages/hooks/permission/useServerSideLogin';
import React from 'react';

function Index() {
  return (
    <div className='flex h-full min-h-[90vh] flex-row'>
      <div className='background-registerProduct'>
        <Link href='/product/sell' className='flex flex-col gap-1 text-center '>
          <h1>LISTA</h1>
          <h1>PRODUCTOS</h1>
        </Link>
      </div>
      <div className='background-listProduct'>
        <Link href='/product/new' className='flex flex-col gap-1 text-center '>
          <h1>REGISTRO</h1>
          <h1>PRODUCTOS</h1>
        </Link>
      </div>
    </div>
  );
}

export const getServerSideProps = withSession(useServerSideLogin);

export default Index;
