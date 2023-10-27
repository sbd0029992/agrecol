/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useServerSideLogin } from 'hooks/permission/useServerSideLogin';
import { CardProps } from 'interface/type';
import withSession from 'lib/session';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type ConfirmModalProps = {
  total: number;
  onConfirm: () => void;
  onCancel: () => void;
};

function Cart() {
  const [cartItems, setCartItems] = useState<CardProps[]>([]);
  const [dataUser, setDataUser] = useState<any>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
            status: 1,
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
    if (!dataUser || !dataUser.idUser) {
      console.error('User data is not available');
      return;
    }

    try {
      const response = await axios.put('/api/cart', {
        userId: dataUser.idUser,
        newStatus: 2,
      });

      if (response.status === 200) {
        toast.success('Compra confirmada');
        getCartItems();
      } else {
        toast.error('Error al confirmar la compra');
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.error(error);
    }
  }

  function ConfirmModal({ total, onConfirm, onCancel }: ConfirmModalProps) {
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60'>
        <div className='w-[80%] max-w-[600px] transform rounded bg-white p-8 shadow-lg transition-transform duration-500 ease-in-out md:w-[60%] lg:w-[40%] xl:w-[30%]'>
          <h2 className='mb-4 text-2xl font-bold'>Confirmar compra</h2>
          <p className='mb-4 text-xl'>Total a pagar: {total} Bs.</p>
          <div className='mt-4 flex justify-between'>
            <button
              onClick={onConfirm}
              className='mr-2 rounded-md bg-secondary py-2 px-4 text-lg text-white hover:bg-opacity-90'
            >
              Confirmar
            </button>
            <button
              onClick={onCancel}
              className='rounded-md bg-gray-300 py-2 px-4 text-lg text-black hover:bg-opacity-80'
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  function handleRealConfirm() {
    handleConfirm();
    setShowConfirmModal(false);
  }

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

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
                <th className='w-[220px] border py-4'>
                  <h1 className='text-lg font-bold'>Total a pagar: {total}</h1>
                </th>
                <th className='border py-4 pl-4 text-center'>Producto</th>
                <th className='border py-4 text-center'>Peso (Kg)</th>
                <th className='border  py-4 text-center'>Precio Bs.</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: any) => (
                <tr key={item._id} className='border-t'>
                  <td className='border-t border-r py-4'>
                    {' '}
                    <div className='flex flex-col place-content-center items-center'>
                      {item.product.photos && item.product.photos.length > 0 ? (
                        <img
                          className='h-[200px] w-[200px] rounded-md object-cover'
                          src={item.product.photos[0]}
                          alt={item.product.name}
                        />
                      ) : (
                        <div className='flex h-[200px] w-[200px] flex-col items-center justify-center rounded-md bg-gray-300 '>
                          <h1 className='text-lg font-bold'>
                            Imagen no disponible
                          </h1>
                        </div>
                      )}
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
                    {item.product.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='mt-4 flex justify-center'>
            <button
              className='rounded-md bg-secondary py-2 px-4 text-white'
              onClick={() => setShowConfirmModal(true)}
            >
              Confirmar
            </button>
          </div>
        </React.Fragment>
      ) : null}
      {showConfirmModal && (
        <ConfirmModal
          total={total}
          onConfirm={handleRealConfirm}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
}

export const getServerSideProps = withSession(useServerSideLogin);

export default Cart;
