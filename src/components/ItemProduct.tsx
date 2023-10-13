/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* @tsxImportSource next/client */
/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { ProductProps } from 'interface/type';
import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { toast } from 'react-toastify';

function ItemProduct({ name, price, photos, _id }: ProductProps) {
  const [peso, setPeso] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dataUser, setDataUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get('/api/auth/user');
      setDataUser(data);
    };
    getUser();
  }, []);

  const handleAdd = () => {
    setPeso((prevPeso) => prevPeso + 0.5);
  };

  const handleSubtract = () => {
    if (peso >= 0.5) {
      setPeso((prevPeso) => prevPeso - 0.5);
    }
  };

  const handleAddToCart = async () => {
    if (dataUser && dataUser.isLoggedIn) {
      try {
        await axios.post('/api/cart', {
          user: dataUser.idUser,
          product: _id,
          quantity: peso,
        });
        toast.success('Producto agregado con éxito!');
        setPeso(0);
      } catch (error) {
        toast.error(
          'Error al agregar el producto. Por favor, intenta nuevamente.'
        );
      }
    } else {
      toast.error(
        'Por favor, inicia sesión para agregar productos al carrito.'
      );
    }
  };

  useEffect(() => {
    setTotalPrice(Math.max(0, peso) * price);
  }, [peso, price]);

  return (
    <div>
      <div className='flex w-[370px] flex-row justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-center text-2xl font-semibold'>{name}</h1>
          <div className='h-[300px] w-[170px] rounded-md bg-gray-300'>
            <img
              className='h-[300px] w-[170px] object-cover'
              src={photos}
              alt={photos}
            />
          </div>
          <h1 className='text-center text-xl'>{`1kg = ${price}bs`}</h1>
        </div>
        <div className='flex flex-col justify-center'>
          <div className='flex flex-col justify-center gap-4'>
            <button
              className='h-[50px] w-min self-center rounded-xl bg-primary py-2 px-4 text-xl text-white'
              onClick={handleAddToCart}
            >
              Añadir
            </button>
            <h1 className='text-center text-sm'>Peso</h1>
            <div className='flex flex-row justify-center gap-4'>
              <div className='flex flex-col gap-5'>
                <FaArrowUp
                  onClick={handleAdd}
                  className='h-5 w-5 cursor-pointer'
                />
                <FaArrowDown
                  onClick={handleSubtract}
                  className='h-5 w-5 cursor-pointer'
                />
              </div>
              <input
                type='text'
                disabled={true}
                placeholder='0'
                value={peso}
                onChange={(e) => setPeso(parseFloat(e.target.value))}
                id='peso'
                className='h-[50px] w-2/6 self-center rounded-lg border-2 border-solid border-fourtiary text-center text-xl'
              />
            </div>
            <h1 className='text-center text-xl'>{`Total: ${totalPrice}bs`}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemProduct;
