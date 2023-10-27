/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useYearlyConsumptionData = () => {
  const [resultArray, setResultArray] = useState<number[]>(
    new Array(12).fill(0)
  );

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const startYear = new Date(today.getFullYear(), 0, 1); // Primer día del año actual

      const response = await axios.get(`/api/cart`, {
        params: {
          startDate: startYear.toISOString(),
          endDate: today.toISOString(),
        },
      });

      const yearData = response.data;
      const monthCount: { [key: number]: number } = {};

      yearData.forEach((data: any) => {
        const dataTime = new Date(data.createdAt);
        const month = dataTime.getMonth();
        const value = data.quantity;

        if (!monthCount[month]) {
          monthCount[month] = value;
        } else {
          monthCount[month] += value;
        }
      });

      const resultArray: number[] = new Array(12).fill(0);

      for (let i = 0; i < 12; i++) {
        if (monthCount[i] !== undefined) {
          resultArray[i] = monthCount[i];
        } else {
          resultArray[i] = 0;
        }
      }

      setResultArray(resultArray);
    };

    fetchData();
  }, []);

  return { resultArray };
};
