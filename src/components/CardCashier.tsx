import { NewUserProps } from 'interface/type';
import Link from 'next/link';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

function CardCashier({ name, _id }: NewUserProps) {
  return (
    <div className='flex h-full min-h-[90vh] flex-col items-center justify-center'>
      <div className='flex h-full  w-[200px] flex-col gap-2 rounded-lg bg-gray-200 px-2 py-4 shadow-sm shadow-gray-600'>
        <FaUserCircle className='h-[200px] w-[200px] self-center' />
        <h1 className='text-center'>{name}</h1>
        <Link
          href={`/user/${_id}/edit`}
          className='w-min self-center rounded-md bg-secondary py-2 px-3 text-white'
        >
          Editar
        </Link>
      </div>
    </div>
  );
}

export default CardCashier;
