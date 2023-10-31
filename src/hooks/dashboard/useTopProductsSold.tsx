/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useTopProductsSold = () => {
  const [topProducts, setTopProducts] = useState<
    { product: string; quantity: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 6);

      const response = await axios.get(`/api/cart`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: today.toISOString(),
        },
      });

      const weekData = response.data;
      const productsCount: { [key: string]: number } = {};

      weekData.forEach((data: any) => {
        if (data.status === 2) {
          const productName = data.product.name;
          const value = data.quantity;

          if (!productsCount[productName]) {
            productsCount[productName] = value;
          } else {
            productsCount[productName] += value;
          }
        }
      });

      const sortedProducts = Object.entries(productsCount)
        .map(([product, quantity]) => ({ product, quantity }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 10);

      setTopProducts(sortedProducts);
    };

    fetchData();
  }, []);

  return { topProducts };
};
