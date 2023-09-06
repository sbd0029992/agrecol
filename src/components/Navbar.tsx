/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

function Navbar() {
  return (
    <React.Fragment>
      <nav className='border-gray-200 bg-white dark:bg-fourtiary '>
        <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
          <Link href='/home' className='flex items-center'>
            <img
              src='https://flowbite.com/docs/images/logo.svg'
              className='mr-3 h-8'
              alt='Flowbite Logo'
            />
            <span className='self-center whitespace-nowrap text-2xl font-semibold dark:text-white'>
              Agrecol
            </span>
          </Link>

          <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
            <ul className='mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-medium dark:border-gray-700 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0'>
              <li>
                <Link
                  href='/home'
                  className='block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/user/register'
                  className='block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                >
                  Registro Cajero
                </Link>
              </li>
              <li>
                <Link
                  href='/product/cart'
                  className='block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                >
                  Carrito
                </Link>
              </li>
              <li>
                <a
                  href='#'
                  className='block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                >
                  Usuario
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
