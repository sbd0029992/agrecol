import React from 'react';

type Props = {
  data: {
    product: string;
    quantity: number;
    purchasePrice: number;
    sellingPrice: number;
  }[];
};

const TopProductsTable: React.FC<Props> = ({ data }) => {
  return (
    <div className='overflow-x-auto'>
      <h1 className='mb-2 text-center font-bold'>Top Selling Products</h1>
      <table className='min-w-full bg-white'>
        <thead>
          <tr>
            <th className='border-b border-r border-gray-300 px-6 py-3 text-left text-center text-sm leading-4 tracking-wider'>
              Product
            </th>
            <th className='border-b border-gray-300 px-6 py-3 text-left text-sm leading-4 tracking-wider'>
              Quantity Sold (Kg)
            </th>
            <th className='border-b border-gray-300 px-6 py-3 text-left text-sm leading-4 tracking-wider'>
              Purchase Price
            </th>
            <th className='border-b border-gray-300 px-6 py-3 text-left text-sm leading-4 tracking-wider'>
              Selling Price
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
              <td className='border-b border-gray-300 px-6 py-4 text-center text-sm leading-5'>
                {item.purchasePrice}
              </td>
              <td className='border-b border-gray-300 px-6 py-4 text-center text-sm leading-5'>
                {item.sellingPrice}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProductsTable;
