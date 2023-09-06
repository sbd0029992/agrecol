/* @tsxImportSource next/client */
import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

interface Products {
  name: string;
  price: number;
}

function ItemProduct({ name, price }: Products) {
  const [peso, setPeso] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleAdd = () => {
    setPeso((prevPeso) => prevPeso + 0.5);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + price / 2);
  };

  const handleSubtract = () => {
    if (peso >= 0.5) {
      setPeso((prevPeso) => prevPeso - 0.5);
      setTotalPrice((prevTotalPrice) => prevTotalPrice - price / 2);
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
          <div className='h-[300px] w-[170px] rounded-md bg-gray-300'></div>
          <h1 className='text-center text-xl'>{`1kg = ${price}bs`}</h1>
        </div>
        <div className='flex flex-col justify-center'>
          <div className='flex flex-col justify-center gap-4'>
            <button className='h-[50px] w-min self-center rounded-xl bg-primary py-2 px-4 text-xl text-white'>
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
