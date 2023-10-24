import React from 'react';

type Props = {
  data: { product: string; quantity: number }[];
};

const TopProductsTable: React.FC<Props> = ({ data }) => {
  return (
    <div className='overflow-x-auto'>
      <h1 className='mb-2 text-center font-bold'>Productos mas vendidos</h1>
      <table className='min-w-full bg-white'>
        <thead>
          <tr>
            <th className='border-b border-r border-gray-300 px-6 py-3 text-left text-center text-sm leading-4 tracking-wider'>
              Producto
            </th>
            <th className='border-b border-gray-300 px-6 py-3 text-left text-sm leading-4 tracking-wider'>
              Cantidad Vendida (Kg)
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className='border-b border-r border-gray-300 px-6 py-4 text-sm leading-5'>
                {item.product}
              </td>
              <td className='border-b border-gray-300 px-6 py-4 text-center text-sm leading-5'>
                {item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProductsTable;
