import React from 'react';

export default function register() {
  return (
    <div className='text m-auto flex h-full min-h-[90vh] w-full flex-col items-center justify-center px-10 py-4 sm:w-2/5  '>
      <div className='flex w-full flex-col items-center justify-center gap-5 '>
        <h1 className='-bold self-start text-3xl font-bold'>
          Registro Estante
        </h1>
        <h1 className='self-start text-lg  text-gray-400'>Nombre Estante</h1>
        <input
          className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2 sm:h-2/6'
          type='text'
          placeholder='Introducir nombre de estante'
        />
        <h1 className='self-start text-lg text-gray-400'>
          Descripción Estante
        </h1>
        <textarea
          className='h-[100px] w-full rounded-md border-2 border-fourtiary px-2  sm:h-2/6'
          placeholder='Descripción de estante'
        />

        <button className='h-[50px] w-[300px] rounded-md bg-primary text-white'>
          Registrar
        </button>
      </div>
    </div>
  );
}
