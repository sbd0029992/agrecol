/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import UseUserDataCookie from 'hooks/userCookieData/userData';
import Link from 'next/link';
import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dataUser = UseUserDataCookie();
  const userType = dataUser?.type;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <nav className='flex h-full flex-col items-center justify-center bg-fourtiary'>
        <div className='flex w-full flex-wrap items-center justify-evenly p-4'>
          <Link href='/' className='flex items-center'>
            <img
              src='/images/agrecol.png'
              className='mr-3 h-8'
              alt='Agrecol logo'
            />
            <span className='self-center whitespace-nowrap text-2xl font-semibold dark:text-white'>
              Agrecol
            </span>
          </Link>

          <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
            <ul className='md:p-0` mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-medium text-white dark:border-gray-700 md:mt-0  md:flex-row md:space-x-4 md:border-0'>
              {userType === 'admin' && (
                <React.Fragment>
                  <li>
                    <Link
                      href='/user/new'
                      className='md:text-md block   rounded py-2 pl-3 pr-4 text-sm text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:bg-transparent md:dark:hover:text-green-200 lg:text-lg'
                    >
                      Reg. Cajero
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/rack/list'
                      className='md:text-md block rounded py-2 pl-3 pr-4 text-sm text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:bg-transparent md:dark:hover:text-green-200 lg:text-lg'
                    >
                      Reg. Estante
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/user/list'
                      className='md:text-md block rounded py-2 pl-3 pr-4 text-sm text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:bg-transparent md:dark:hover:text-green-200 lg:text-lg'
                    >
                      Lista Cajeros
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/sell/list'
                      className='md:text-md block rounded py-2 pl-3 pr-4 text-sm text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:bg-transparent md:dark:hover:text-green-200 lg:text-lg'
                    >
                      Ventas
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/dashboard'
                      className='md:text-md block rounded py-2 pl-3 pr-4 text-sm text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:bg-transparent md:dark:hover:text-green-200 lg:text-lg'
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/product/list'
                      className='md:text-md block rounded py-2 pl-3 pr-4 text-sm text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:bg-transparent md:dark:hover:text-green-200 lg:text-lg'
                    >
                      Productos
                    </Link>
                  </li>
                </React.Fragment>
              )}

              {userType === 'cashier' && (
                <React.Fragment>
                  <li>
                    <Link
                      href='/product/cart'
                      className='md:text-md block rounded py-2 pl-3 pr-4 text-sm text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:bg-transparent md:dark:hover:text-green-200 lg:text-lg'
                    >
                      Carrito
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/product/list'
                      className='md:text-md block rounded py-2 pl-3 pr-4 text-sm text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:bg-transparent md:dark:hover:text-green-200 lg:text-lg'
                    >
                      Productos
                    </Link>
                  </li>
                </React.Fragment>
              )}

              <li>
                <ul className='relative'>
                  <li>
                    <a
                      onClick={toggleDropdown}
                      className='md:text-md block rounded py-2 pl-3 pr-4 text-sm text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:bg-transparent md:dark:hover:text-green-200 lg:text-lg'
                    >
                      Usuario
                    </a>
                    {isOpen && (
                      <ul className='absolute left-auto right-0 mt-2 w-48 rounded-lg border border-gray-300 bg-white shadow-lg'>
                        {dataUser?.type ? (
                          <li className='font-normal text-black'>
                            <h1 className='block px-4 py-2 font-bold hover:bg-gray-200'>
                              {dataUser.type === 'cashier'
                                ? 'CAJERO'
                                : 'ADMINISTRADOR'}
                            </h1>
                          </li>
                        ) : null}

                        <li className='font-normal text-black'>
                          {dataUser?.isLoggedIn ? null : (
                            <Link
                              href='/login'
                              className='block px-4 py-2 hover:bg-gray-200'
                              onClick={closeDropdown}
                            >
                              Iniciar Sesión
                            </Link>
                          )}

                          <Link
                            href='/user/profile'
                            className='block px-4 py-2 hover:bg-gray-200'
                            onClick={closeDropdown}
                          >
                            Perfil
                          </Link>
                        </li>

                        <li className='font-normal text-black'>
                          {dataUser?.isLoggedIn ? (
                            <Link
                              href='/api/auth/logout'
                              className='block px-4 py-2 hover:bg-gray-200'
                              onClick={closeDropdown}
                            >
                              Cerrar Sesión
                            </Link>
                          ) : null}
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
