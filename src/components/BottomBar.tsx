import UseUserDataCookie from 'hooks/userCookieData/userData';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  FaChartBar,
  FaDollarSign,
  FaHome,
  FaList,
  FaShoppingCart,
  FaUser,
  FaUserEdit,
} from 'react-icons/fa';

function BottomBar() {
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
      <nav className='fixed inset-x-0 bottom-0 flex items-center justify-evenly bg-fourtiary p-4'>
        <Link href='/'>
          <div className='flex flex-col items-center gap-1'>
            <FaHome size={16} className='text-white' />
            <span className='text-[10px] text-white'>Home</span>
          </div>
        </Link>

        {userType === 'admin' && (
          <React.Fragment>
            <Link href='/user/new'>
              <div className='flex flex-col items-center gap-1'>
                <FaUser size={16} className='text-white' />
                <span className='text-[10px] text-white'>Cajero</span>
              </div>
            </Link>

            <Link href='/rack/list'>
              <div className='flex flex-col items-center gap-1'>
                <FaList size={16} className='text-white' />
                <span className='text-[10px] text-white'>Estante</span>
              </div>
            </Link>

            <Link href='/sell/list'>
              <div className='flex flex-col items-center gap-1'>
                <FaDollarSign size={16} className='text-white' />
                <span className='text-[10px] text-white'>Ventas</span>
              </div>
            </Link>

            <Link href='/dashboard'>
              <div className='flex flex-col items-center gap-1'>
                <FaChartBar size={16} className='text-white' />
                <span className='text-[10px] text-white'>Dashboard</span>
              </div>
            </Link>

            <Link href='/product/list'>
              <div className='flex flex-col items-center gap-1'>
                <FaList size={16} className='text-white' />
                <span className='text-[10px] text-white'>Productos</span>
              </div>
            </Link>
          </React.Fragment>
        )}

        {userType === 'cashier' && (
          <React.Fragment>
            <Link href='/product/cart'>
              <div className='flex flex-col items-center gap-1'>
                <FaShoppingCart size={16} className='text-white' />
                <span className='text-[10px] text-white'>Carrito</span>
              </div>
            </Link>

            <Link href='/product/list'>
              <div className='flex flex-col items-center gap-1'>
                <FaList size={16} className='text-white' />
                <span className='text-[10px] text-white'>Productos</span>
              </div>
            </Link>
          </React.Fragment>
        )}

        <div className='relative flex flex-col items-center gap-1'>
          <FaUserEdit
            size={16}
            className='text-white'
            onClick={toggleDropdown}
          />
          <span className='text-[10px] text-white'>Usuario</span>

          {isOpen && (
            <ul className='absolute left-auto right-0 bottom-full mb-2 w-48 rounded-lg border border-gray-300 bg-white shadow-lg'>
              {dataUser?.type ? (
                <li className='font-normal text-black'>
                  <h1 className='block px-4 py-2 font-bold hover:bg-gray-200'>
                    {dataUser.type === 'cashier' ? 'CAJERO' : 'ADMINISTRADOR'}
                  </h1>
                </li>
              ) : null}

              <li className='font-normal text-black'>
                {dataUser?.isLoggedIn ? null : (
                  <Link
                    className='block px-4 py-2 hover:bg-gray-200'
                    onClick={closeDropdown}
                    href='/login'
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
                    className='block px-4 py-2 hover:bg-gray-200'
                    onClick={closeDropdown}
                    href='/api/auth/logout'
                  >
                    Cerrar Sesión
                  </Link>
                ) : null}
              </li>
            </ul>
          )}
        </div>
      </nav>
    </React.Fragment>
  );
}

export default BottomBar;
