import React, { useEffect, useState } from 'react';

import ItemProduct from '../../components/ItemProduct';

function List() {
  const products = [
    { name: 'Limones', price: 20 },
    { name: 'Durazno', price: 5 },
    { name: 'Platano', price: 2 },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <div className='flex h-full min-h-screen flex-row'>
      <div className='w-full px-10 py-4'>
        <div className='flex items-center self-center'>
          <input
            className='h-[50px] w-[300px] rounded-md border-2 px-2'
            type='text'
            placeholder='Buscar'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='flex flex-row flex-wrap justify-center gap-5'>
          {filteredProducts.map((product, index) => (
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
