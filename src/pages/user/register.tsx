import Link from 'next/link';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

function Register() {
  return (
    <div className='flex h-full min-h-screen flex-row'>
      <div className='w-[50vw] bg-secondary px-10 py-4'>
        <h1 className='text-xl font-bold text-white'>Logo</h1>
      </div>
      <div className='w-[50vw]  px-10 py-4 '>
        <Link href='/' className='flex flex-row items-center gap-2 self-center'>
          <FaArrowLeft className='text-lg text-gray-400' />
          <p className='font-semibold text-gray-400'>Atrás</p>
        </Link>
        <div className='m-auto flex h-[99%] w-3/4 flex-col items-center  justify-center'>
          <div className='flex w-full flex-col items-center justify-center gap-5 '>
            <h1 className='-bold self-start text-3xl'>Registro Cajero</h1>
            <h1 className='self-start text-lg text-gray-400'>
              Nombre Completo
            </h1>
            <input
              className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
              type='text'
              placeholder='Introducir su nombre completo'
            />
            <h1 className='self-start text-lg text-gray-400'>
              Usuario (Correo)
            </h1>
            <input
              className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
              type='text'
              placeholder='ejemplo@gmail.com'
            />
            <h1 className='self-start text-lg text-gray-400'>Genero</h1>
            <select className='h-[50px] w-full rounded-md border-2 border-fourtiary bg-white  px-2'>
              <option value='M'>Masculino</option>
              <option value='F'>Femenino</option>
            </select>
            <h1 className='self-start text-lg text-gray-400'>
              Año de nacimiento
            </h1>
            <input
              className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
              type='date'
            />
            <h1 className='self-start text-lg text-gray-400'>
              Carnet de Identidad
            </h1>
            <input
              className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
              type='text'
              placeholder='Introducir su carnet de identidad'
            />

            <button className='h-[50px] w-[300px] rounded-md bg-primary text-white'>
              Registrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
