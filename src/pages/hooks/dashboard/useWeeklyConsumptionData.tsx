/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useWeeklyConsumptionData = () => {
  // Cambio en la declaración del estado
  const [resultArray, setResultArray] = useState<(number | null)[]>([]);

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
      const dayData: { [key: number]: { max: number; min: number } } = {};

      weekData.forEach((data: any) => {
        const dataTime = new Date(data.createdAt);
        const day = dataTime.getDay();
        const value = data.quantity;

        if (!dayData[day]) {
          dayData[day] = { max: value, min: value };
        } else {
          dayData[day].max = Math.max(dayData[day].max, value);
          dayData[day].min = Math.min(dayData[day].min, value);
        }
      });

      const resultArray: (number | null)[] = [];
      const todayDay = today.getDay();

      for (let i = 6; i >= 0; i--) {
        const dayIndex = (todayDay - i + 7) % 7;

        if (dayData[dayIndex]) {
          resultArray.push(dayData[dayIndex].max, dayData[dayIndex].min);
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
