/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

function List() {
  const products = [
    {
      imagen: '/images/limes.jpg',
      peso: '500g',
      totalBs: 20,
      cajero: 'Juan',
      fecha: '2023-01-01',
    },
    {
      imagen: '/images/limes.jpg',
      peso: '300g',
      totalBs: 5,
      cajero: 'Pedro',
      fecha: '2023-01-02',
    },
    // Añade más productos aquí
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        Object.values(product).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }, [searchTerm]);

  return (
    <div className='h-min-[90vh] flex h-full w-full flex-col sm:p-4'>
      <div className='item-start flex'>
        <input
          className='mb-2 w-[200px] rounded-md border-2 px-2 '
          type='text'
          placeholder='Buscar'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className='m-auto w-full table-auto border-collapse border-2 border-gray-200 md:w-2/3'>
        {' '}
        <thead>
          <tr>
            <th className='border text-center'>Producto</th>
            <th className='border text-center'>Peso</th>
            <th className='border text-center'>Total Bs</th>
            <th className='border text-center'>Cajero</th>
            <th className='border text-center'>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={index}>
              <td className='flex items-center justify-center border py-2'>
                <img
                  src={product.imagen}
                  alt='product'
                  height={100}
                  width={100}
                />
              </td>
              <td className='border text-center'>{product.peso}</td>
              <td className='border text-center'>{product.totalBs}</td>
              <td className='border text-center'>{product.cajero}</td>
              <td className='border text-center'>{product.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
