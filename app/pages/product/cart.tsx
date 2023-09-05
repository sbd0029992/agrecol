import Image from "next/image";
import Link from "next/link";
import React from "react";

function Cart() {
  return (
    <div>
      <div>
        <Link href="/">
          <h1 className="">Comprar mas Productos?</h1>
        </Link>
      </div>
      <table className="w-2/3 m-auto">
        <thead>
          <tr>
            <th className="py-2"></th>
            <th className="py-2">Producto</th>
            <th className="py-2">Peso</th>
            <th className="py-2">Valor</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="">
              <div className="flex items-center place-content-center">
                <Image
                  width={150}
                  height={150}
                  src="/images/imgListProduct.jpg"
                  alt="Product 1"
                />
              </div>
            </td>
            <td className="text-center">Limones</td>
            <td className="text-center">2 kg</td>
            <td className="text-center">$5</td>
            <td className="text-center">
              <button className=" bg-red-400 text-white py-2 px-4 rounded">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        <button className="bg-primary text-white py-2 px-4 rounded">
          Confirmar
        </button>
      </div>
    </div>
  );
}

export default Cart;
