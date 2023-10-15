import { ProductProps } from 'interface/type';
import React, { useEffect, useState } from 'react';

import ItemProduct from '../../components/ItemProduct';

function List() {
  const [products, setNewProduct] = useState<ProductProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products?status=1`);
        const products = await res.json();
        setNewProduct(products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className='flex h-full min-h-[90vh] flex-row'>
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
              _id={product._id}
              key={index}
              rack={product.rack}
              name={product.name}
              price={product.price}
              weight={product.weight}
              photos={
                product.photos && product.photos.length > 0
                  ? product.photos[0]
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default List;
