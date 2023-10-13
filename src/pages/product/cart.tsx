/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { CardProps } from 'interface/type';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState<CardProps[]>([]);
  const [dataUser, setDataUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get('/api/auth/user');
      setDataUser(data);
    };
    getUser();
  }, []);

  const getCartItems = async () => {
    if (dataUser) {
      try {
        const { data } = await axios.get('/api/cart', {
          params: {
            userId: dataUser.idUser,
          },
        });
        setCartItems(data);
      } catch (error) {
        console.error('There was an error retrieving the cart items', error);
      }
    }
  };

  useEffect(() => {
    getCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUser]);

  async function handleRemove(cartId: string) {
    try {
      await axios.delete(`/api/cart/${cartId}`);
      getCartItems();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleConfirm() {
    try {
      const response = await axios.put('/api/cart', {
        userId: dataUser.idUser,
        newStatus: 2,
      });

      if (response.status === 200) {
        getCartItems();
      }
    } catch (error: any) {
      alert(error.response.data.error);
      console.error(error);
    }
  }

  return (
    <div>
      <div className='px-2 py-4'>
        <Link
          className='rounded-md bg-secondary py-2 px-4 text-white '
          href='/product/sell'
        >
          {cartItems.length > 0 ? 'Seguir comprando' : 'Comprar productos'}
        </Link>
      </div>
      {cartItems.length > 0 ? (
        <React.Fragment>
          <table className='m-auto w-2/3 border-collapse rounded bg-white px-4 pt-4 pb-8 shadow-md'>
            <thead>
              <tr>
                <th className='w-[220px] border py-4'></th>
                <th className='border py-4 pl-4 text-center'>Producto</th>
                <th className='border py-4 text-center'>Cantidad</th>
                <th className='border  py-4 text-center'>Puntos</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: any) => (
                <tr key={item._id} className='border-t'>
                  <td className='border-t border-r py-4'>
                    {' '}
                    <div className='flex flex-col place-content-center items-center'>
                      <img
                        width={150}
                        height={150}
                        src={item.product.photos[0]}
                        alt='Product Image'
                        className='rounded-md shadow-sm'
                      />
                      <button
                        className='mt-2 rounded-md bg-red-400 py-2 px-4 text-white'
                        onClick={() => handleRemove(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                  <td className='border-t border-r py-4 text-center'>
                    {' '}
                    {item.product.name}
                  </td>
                  <td className='border-t border-r py-4 text-center'>
                    {item.quantity}
                  </td>
                  <td className='border-t border-r py-4 text-center'>
                    {item.product.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='mt-4 flex justify-center'>
            <button
              className='rounded-md bg-secondary py-2 px-4 text-white'
              onClick={handleConfirm}
            >
              Confirmar
            </button>
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
}

export default Cart;
