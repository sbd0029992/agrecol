import Link from 'next/link';
import React from 'react';

function MyComponent() {
  return (
    <div className='flex min-h-[90vh] flex-row'>
      <div className='background-registerProduct'>
        <Link href='/product/list' className='flex flex-col gap-1 text-center '>
          <h1>LISTA</h1>
          <h1>PRODUCTOS</h1>
        </Link>
      </div>
      <div className='background-listProduct'>
        <Link
          href='/product/register'
          className='flex flex-col gap-1 text-center '
        >
          <h1>REGISTRO</h1>
          <h1>PRODUCTOS</h1>
        </Link>
      </div>
    </div>
  );
}

export default MyComponent;
