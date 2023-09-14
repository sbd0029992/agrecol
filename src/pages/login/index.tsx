import Link from 'next/link';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

function index() {
  return (
    <div className='flex h-full min-h-screen flex-row'>
      <div className='w-[50vw] bg-secondary px-10 py-4'>
        <h1 className='text-xl font-bold text-white'>Logo</h1>
      </div>
      <div className='w-[50vw]  px-10 py-4 '>
        <Link
          href='/home'
          className='flex flex-row items-center gap-2 self-center'
        >
          <FaArrowLeft className='text-lg text-gray-400' />
          <p className='font-semibold text-gray-400'>Atrás</p>
        </Link>
        <div className='m-auto flex h-[99%] w-3/4 flex-col items-center  justify-center'>
          <div className='flex w-full flex-col items-center justify-center gap-5 '>
            <h1 className='self-start text-3xl font-bold'>Iniciar Sesión</h1>
            <h1 className='self-start text-lg text-gray-400'>Iniciar Sesión</h1>
            <input
              className='h-[50px] w-full rounded-md border-2  px-2'
              type='text'
              placeholder='cajero@gmail.com'
            />
            <h1 className='self-start text-lg text-gray-400'>Contraseña</h1>
            <input
              className='h-[50px] w-full rounded-md border-2  px-2'
              type='password'
              placeholder='********'
            />
            <button className='h-[50px] w-[300px] rounded-md bg-primary text-white'>
              Iniciar Sesión
            </button>

            <p>¿Olvidaste tu contraseña?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
