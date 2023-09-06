import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Cart() {
  return (
    <div>
      <div>
        <Link href='/'>
          <h1 className=''>Comprar mas Productos?</h1>
        </Link>
      </div>
      <table className='m-auto w-2/3'>
        <thead>
          <tr>
            <th className='py-2'></th>
            <th className='py-2'>Producto</th>
            <th className='py-2'>Peso</th>
            <th className='py-2'>Valor</th>
            <th className='py-2'></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className=''>
              <div className='flex place-content-center items-center'>
                <Image
                  width={150}
                  height={150}
                  src='/images/imgListProduct.jpg'
                  alt='Product 1'
                />
              </div>
            </td>
            <td className='text-center'>Limones</td>
            <td className='text-center'>2 kg</td>
            <td className='text-center'>$5</td>
            <td className='text-center'>
              <button className=' rounded bg-red-400 py-2 px-4 text-white'>
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className='mt-4 flex justify-center'>
        <button className='rounded bg-primary py-2 px-4 text-white'>
          Confirmar
        </button>
      </div>
    </div>
  );
}

export default Cart;
