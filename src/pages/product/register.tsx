import React from 'react';

function Register() {
  return (
    <div className='m-auto flex h-full min-h-[90vh] w-1/2 flex-row py-2'>
      <div className='w-full self-center px-10 '>
        <div className='m-auto flex h-[99%] w-3/4 flex-col items-center  justify-center'>
          <div className='flex w-full flex-col items-center justify-center gap-3 '>
            <h1 className='-bold self-start text-3xl'>Registrar Producto</h1>
            <h1 className='self-start text-lg text-gray-400'>Nombre</h1>
            <input
              className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
              type='text'
              placeholder='Introducir su nombre completo'
            />
            <h1 className='self-start text-lg text-gray-400'>
              Descripción del producto
            </h1>
            <textarea
              className='h-[100px] w-full rounded-md border-2 border-fourtiary  px-2'
              placeholder='ejemplo@gmail.com'
            />
            <h1 className='self-start text-lg text-gray-400'>
              Ubicacion del Producto
            </h1>
            <select className='h-[50px] w-full rounded-md border-2 border-fourtiary bg-white  px-2'>
              <option value='12'>Estante 1</option>
              <option value='11'>Estante 2</option>
            </select>
            <h1 className='self-start text-lg text-gray-400'>
              Fecha de Recepcion
            </h1>
            <input
              className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
              type='date'
            />

            <h1 className='self-start text-lg text-gray-400'>
              Peso en Kilogramos
            </h1>
            <input
              className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
              type='number'
            />
            <h1 className='self-start text-lg text-gray-400'>
              Precio por Kilogramo
            </h1>
            <input
              className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
              type='number'
            />
            <h1 className='self-start text-lg text-gray-400'>
              Seleccionar Imagen
            </h1>
            <button className=' h-[50px] self-start rounded-md bg-primary px-4 text-white'>
              Subir Imagen
            </button>
            <button className='h-[50px] rounded-md bg-secondary px-8 text-white'>
              Registrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
