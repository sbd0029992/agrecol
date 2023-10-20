/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useYearlyConsumptionData = () => {
  const [resultArray, setResultArray] = useState<(any | any)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const startDate = new Date(today.getFullYear(), 0, 1);

      const response = await axios.get(`/api/tanks`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: today.toISOString(),
        },
      });

      const yearData = response.data;
      const monthData: { [key: number]: number[] } = {};

      yearData.forEach((data: any) => {
        const dataTime = new Date(data.createdAt);
        const month = dataTime.getMonth();
        if (!monthData[month]) monthData[month] = [];
        monthData[month].push(data.value);
      });

      const resultArray: (number | null)[] = [];
      for (let i = 0; i < 12; i++) {
        if (monthData[i]) {
          resultArray.push(
            Math.max(...monthData[i]),
            Math.min(...monthData[i])
          );
        } else {
          resultArray.push(null, null);
        }
      }

      setResultArray(resultArray);
    };

    fetchData();
  }, []);

  return { resultArray };
};
