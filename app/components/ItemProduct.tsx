/* @tsxImportSource next/client */
import React, { useState, useEffect } from "react";

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
    setPeso((prevPeso) => prevPeso - 0.5);
    setTotalPrice((prevTotalPrice) => prevTotalPrice - price / 2);
  };

  useEffect(() => {
    setTotalPrice(peso * price);
  }, [peso, price]);

  return (
    <div>
      <div className="flex flex-row justify-between w-[350px]">
        <div className="flex flex-col">
          <h1 className="text-center text-2xl font-semibold">{name}</h1>
          <div className="w-[170px] h-[300px] bg-gray-300 rounded-md"></div>
          <h1 className="text-center text-xl">{`1kg / ${price}bs`}</h1>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex flex-col justify-center gap-4">
            <button className="text-white w-min text-xl bg-primary rounded-xl self-center py-2 px-4 h-[50px]">
              Añadir
            </button>
            <h1 className="text-sm text-center">Peso</h1>
            <div className="flex flex-row justify-center gap-4">
              <div className="flex flex-col gap-5">
                <button
                  onClick={handleSubtract}
                  className="text-white text-lg bg-primary rounded-xl py-2 px-2 h-[50px]"
                >
                  -0.5
                </button>
                <button
                  onClick={handleAdd}
                  className="text-white text-lg bg-primary rounded-xl py-2 px-2 h-[50px]"
                >
                  +0.5
                </button>
              </div>
              <input
                type="number"
                placeholder="0"
                value={peso}
                onChange={(e) => setPeso(parseFloat(e.target.value))}
                id="peso"
                className="text-xl h-[50px] w-2/6 border-solid border-2 border-fourtiary text-center self-center rounded-lg"
              />
            </div>
            <h1 className="text-center text-xl">{`Total: ${totalPrice}bs`}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemProduct;
