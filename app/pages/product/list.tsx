/* @tsxImportSource next/client */

"use client"; // This is a client component 👈🏽
import ItemProduct from "@/app/components/ItemProduct";
import React from "react";

function List() {
  const products = [
    { name: "Limones", price: 20 },
    { name: "Durazno", price: 5 },
    { name: "Platano", price: 2 },
    { name: "Papaya", price: 5 },
  ];
  return (
    <div className="flex flex-row min-h-screen h-full">
      <div className="w-full px-10 py-4 ">
        <div className="flex items-center self-center">
          <input
            className="w-[300px] h-[50px] px-2 border-2  rounded-md"
            type="text"
            placeholder="Buscar"
          />
        </div>
        <div className="flex flex-row gap-5 flex-wrap justify-center">
          {products.map((product, index) => (
            <ItemProduct
              key={index}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default List;
