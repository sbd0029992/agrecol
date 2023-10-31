/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useCashierSalesData = () => {
  const [cajeroNames, setCajeroNames] = useState<string[]>([]);
  const [cajeroSold, setCajeroSold] = useState<number[]>([]);

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

      const cashierSales: { [key: string]: { name: string; sales: number } } =
        {};

      weekData.forEach((data: any) => {
        if (data.status === 2) {
          const cashierId = data.user._id;
          const cashierName = data.user.name;
          const saleQuantity = data.quantity;

          if (!cashierSales[cashierId]) {
            cashierSales[cashierId] = {
              name: cashierName,
              sales: saleQuantity,
            };
          } else {
            cashierSales[cashierId].sales += saleQuantity;
          }
        }
      });

      const sortedCashiers = Object.values(cashierSales).sort(
        (a, b) => b.sales - a.sales
      );

      const sortedNames: string[] = [];
      const sortedSold: number[] = [];

      sortedCashiers.forEach((cashier) => {
        sortedNames.push(cashier.name);
        sortedSold.push(cashier.sales);
      });

      setCajeroNames(sortedNames);
      setCajeroSold(sortedSold);
    };

    fetchData();
  }, []);

  return { cajeroNames, cajeroSold };
};
