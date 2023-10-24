/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useWeeklyConsumptionData = () => {
  const [resultArray, setResultArray] = useState<number[]>(
    new Array(7).fill(0)
  );

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
      const dayCount: { [key: number]: number } = {};

      weekData.forEach((data: any) => {
        const dataTime = new Date(data.createdAt);
        const day = dataTime.getDay();
        const value = data.quantity;

        if (!dayCount[day]) {
          dayCount[day] = value;
        } else {
          dayCount[day] += value;
        }
      });

      const resultArray: number[] = new Array(7).fill(0);
      const todayDay = today.getDay();

      for (let i = 0; i < 7; i++) {
        const dayIndex = (todayDay - i + 7) % 7;

        if (dayCount[dayIndex]) {
          resultArray[dayIndex] = dayCount[dayIndex];
        } else {
          resultArray[dayIndex] = 0;
        }
      }

      setResultArray(resultArray);
    };

    fetchData();
  }, []);

  return { resultArray };
};
