import Link from 'next/link';
import React from 'react';

interface CardProfileProps {
  name: string;
  ci: string;
  email: string;
  date: string;
  phone: string;
}

function CardProfile({ name, ci, email, date, phone }: CardProfileProps) {
  return (
    <div className='ounded-lg flex h-full w-[300px] flex-col items-center justify-center gap-2 rounded-lg bg-gray-200 py-4 px-6 shadow-md'>
      <h1 className='text-2xl font-bold'>Cajero</h1>
      <div className='my-2 w-full border-b border-gray-400'></div>
      <div className='self-start'>
        <h2 className='text-lg font-semibold'>Nombre Completo:</h2>
        <p className='text-gray-800'>{name}</p>
      </div>
      <div className='self-start'>
        <h2 className='text-lg font-semibold'>Cédula de Identidad:</h2>
        <p className='text-gray-800'>{ci}</p>
      </div>
      <div className='self-start'>
        <h2 className='text-lg font-semibold'>Correo Electrónico:</h2>
        <p className='text-gray-800'>{email}</p>
      </div>
      <div className='self-start'>
        <h2 className='text-lg font-semibold'>Fecha de Nacimiento:</h2>
        <p className='text-gray-800'>{date}</p>
      </div>
      <div className='self-start'>
        <h2 className='text-lg font-semibold'>Teléfono:</h2>
        <p className='text-gray-800'>{phone}</p>
      </div>
      <div>
        <Link
          href='/user/register'
          className='rounded-lg bg-secondary py-2 px-4 text-white'
        >
          Editar Perfil
        </Link>
      </div>
    </div>
  );
}

export default CardProfile;
