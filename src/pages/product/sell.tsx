import { ProductProps, RackProps } from 'interface/type';
import React, { useEffect, useState } from 'react';

import ItemProduct from '../../components/ItemProduct';

function List() {
  const [products, setNewProduct] = useState<ProductProps[]>([]);
  const [racks, setRacks] = useState<RackProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRack, setSelectedRack] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) => {
      if (a.name && b.name) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      }
      return 0;
    });

    setFilteredProducts(
      sortedProducts.filter(
        (product) =>
          product.name &&
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (!selectedRack || product.rack._id === selectedRack)
      )
    );
  }, [searchTerm, selectedRack, products]);

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

  useEffect(() => {
    const fetchTrucks = async () => {
      const response = await fetch(`/api/racks?status=1`);
      const data = await response.json();
      setRacks(data);
    };
    fetchTrucks();
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
          <select
            className='ml-4 h-[50px] rounded-md border-2 px-2'
            onChange={(e) =>
              setSelectedRack(e.target.value === 'all' ? null : e.target.value)
            }
          >
            <option value='all'>Todos los estantes</option>
            {racks.map((rack) => (
              <option key={rack._id} value={rack._id}>
                {rack.name}
              </option>
            ))}
          </select>
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
