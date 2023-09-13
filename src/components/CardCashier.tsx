import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface CardCashierProps {
  name: string;
}

function CardCashier({ name }: CardCashierProps) {
  return (
    <div className='px2 flex h-full flex-col gap-2 rounded-lg bg-gray-200 px-2 py-4 shadow-sm shadow-gray-600'>
      <FaUserCircle className='h-[200px] w-[200px] self-center' />
      <h1 className='text-center'>{name}</h1>
      <button className='w-min self-center rounded-md bg-secondary py-2 px-3 text-white'>
        Editar
      </button>
    </div>
  );
}

export default CardCashier;
