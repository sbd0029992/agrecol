/* eslint-disable @next/next/no-img-element */
import { useServerSideLogin } from 'hooks/permission/useServerSideLogin';
import { ProductProps } from 'interface/type';
import withSession from 'lib/session';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ListRack: React.FC = () => {
  const [newProduct, setNewProduct] = useState<ProductProps[]>([]);
  const getProduct = async () => {
    try {
      const res = await fetch(`/api/products`);
      const products = await res.json();
      setNewProduct(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (!newProduct || !newProduct.length)
    return (
      <div className='p-4'>
        <Link
          href='/product/new'
          className='rounded-md bg-secondary py-2 px-4 text-lg text-white'
        >
          Registrar Productos
        </Link>
      </div>
    );

  return (
    <React.Fragment>
      <div className='flex flex-row flex-wrap justify-center gap-5 px-2 py-2 md:px-0'>
        {newProduct.map((product: ProductProps) => (
          <div
            key={product._id}
            className='min-h-[300[px] w-[220px] overflow-hidden rounded bg-gray-200 py-4 px-2 shadow-xl '
          >
            {product.photos && product.photos.length > 0 ? (
              <img
                className='h-[200px] w-[200px] rounded-md object-cover'
                src={product.photos[0]}
                alt={product.name}
              />
            ) : (
              <div className='flex h-[200px] w-[200px] flex-col items-center justify-center rounded-md bg-white '>
                <h1 className='text-lg font-bold'>Imagen no disponible</h1>
              </div>
            )}
            <div className='flex flex-col items-center justify-center '>
              <div className='mb-2 text-xl font-bold'>{product.name}</div>
              <p className='text-base text-gray-700'>{product.description}</p>
            </div>
            <div className='mt-2 mb-2 flex flex-row items-center justify-center '>
              <span
                className={` mr-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                  product.status === 1
                    ? 'bg-primary text-white'
                    : 'bg-red-400 text-white'
                }`}
              >
                {product.status === 1 ? 'Disponible' : 'No Disponible'}
              </span>
            </div>
            <div className='mt-2 flex flex-row items-center justify-center'>
              <Link
                className='rounded-md bg-secondary py-2 px-4 text-lg text-white'
                href={`/product/${product._id}/edit`}
              >
                Editar
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className='h-[50px] md:hidden'></div>
    </React.Fragment>
  );
};

export const getServerSideProps = withSession(useServerSideLogin);

export default ListRack;
