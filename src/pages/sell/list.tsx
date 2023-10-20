/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { CardProps } from 'interface/type';
import React, { useEffect, useState } from 'react';

function ListCardComplete() {
  const [cartItems, setCartItems] = useState<CardProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(cartItems);
  const [sortedProducts, setSortedProducts] = useState(filteredProducts);
  const [sortBy, setSortBy] = useState('none');

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const { data } = await axios.get('/api/cart', {
          params: {
            status: 2,
          },
        });
        setCartItems(data);
      } catch (error) {
        console.error('There was an error retrieving the cart items', error);
      }
    };

    getCartItems();
  }, []);

  useEffect(() => {
    const filtered = cartItems.filter((product) =>
      product.user.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);

    let sorted;
    switch (sortBy) {
      case 'newest':
        sorted = [...filtered].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'oldest':
        sorted = [...filtered].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      default:
        sorted = filtered;
        break;
    }

    setSortedProducts(sorted);
  }, [searchTerm, cartItems, sortBy]);

  return (
    <div className='h-min-[90vh] flex h-full w-full flex-col sm:p-4'>
      <div className='item-start flex'>
        <input
          className='mb-2 w-[200px] rounded-md border-2 px-2 '
          type='text'
          placeholder='Buscar'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className='ml-4 mb-2 w-[200px] rounded-md border-2 px-2'
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value='none'>Ordenar por...</option>
          <option value='oldest'>Más antiguos primero</option>
          <option value='newest'>Más recientes primero</option>
        </select>
      </div>
      <table className='m-auto w-full table-auto border-collapse border-2 border-gray-200 md:w-2/3'>
        <thead>
          <tr>
            <th className='w-[150px] border text-center'>Producto</th>
            <th className='w-24 border text-center'>Kg. Comprados</th>
            <th className='w-20 border text-center'>Total Bs.</th>
            <th className='w-[100px] border text-center'>Cajero</th>
            <th className='w-[70px] border text-center'>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product, index) => (
            <tr key={index}>
              <td className='flex items-center justify-center border py-2'>
                {product.product.photos && product.product.photos.length > 0 ? (
                  <div>
                    <img
                      className='h-[200px] w-[150px] rounded-md object-cover'
                      src={product.product.photos[0]}
                      alt={product.product.name}
                    />
                    <h1 className='mt-2 text-center'>
                      {product.product.name} - {product.product.price} Bs
                    </h1>
                  </div>
                ) : (
                  <div className='flex h-[200px] w-[150px] flex-col items-center justify-center rounded-md bg-gray-300 '>
                    <h1 className='text-lg font-bold'>Imagen no disponible</h1>
                  </div>
                )}
              </td>
              <td className='border text-center'>{product.quantity}</td>
              <td className='border text-center'>
                {product.quantity * product.product.price}
              </td>
              <td className='border text-center'>{product.user.name}</td>
              <td className='border text-center'>
                {product.createdAt
                  ? new Date(product.createdAt).toLocaleDateString('es-ES')
                  : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListCardComplete;
