/* eslint-disable @typescript-eslint/no-explicit-any */
import { PieChartProps } from 'interface/type';
import React, { useEffect, useRef, useState } from 'react';

export default function PieChart({
  labels,
  title,
  dailyData,
  weeklyData,
  monthlyData,
  yearlyData,
}: PieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeFrame, setTimeFrame] = useState('Daily');

  const randomColor = () => {
    const red = Math.floor(Math.random() * 156) + 100;
    const green = Math.floor(Math.random() * 156) + 100;
    const blue = Math.floor(Math.random() * 156) + 100;
    return '#' + red.toString(16) + green.toString(16) + blue.toString(16);
  };

  useEffect(() => {
    let dataToUse: number[] | any;
    if (timeFrame === 'Daily') {
      dataToUse = dailyData;
    } else if (timeFrame === 'Weekly') {
      dataToUse = weeklyData;
    } else if (timeFrame === 'Monthly') {
      dataToUse = monthlyData;
    } else if (timeFrame === 'Yearly') {
      dataToUse = yearlyData;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) {
      console.error('El contexto del canvas es null');
      return;
    }

    const total = dataToUse.reduce((acc: any, value: any) => acc + value, 0);
    let startAngle = 0;

    dataToUse.forEach((value: any, index: any) => {
      const sliceAngle = (2 * Math.PI * value) / total;
      const midAngle = startAngle + sliceAngle / 2;
      context.beginPath();
      context.moveTo(canvas.width / 2, canvas.height / 2);
      context.arc(
        canvas.width / 2,
        canvas.height / 2,
        Math.min(canvas.width / 2, canvas.height / 2),
        startAngle,
        startAngle + sliceAngle
      );
      context.closePath();
      context.fillStyle = randomColor();
      context.fill();

      const textX =
        canvas.width / 2 +
        (Math.min(canvas.width / 2, canvas.height / 2) / 2) *
          Math.cos(midAngle);
      const textY =
        canvas.height / 2 +
        (Math.min(canvas.width / 2, canvas.height / 2) / 2) *
          Math.sin(midAngle);
      context.fillStyle = '#000';
      context.font = '13px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(labels[index], textX, textY);

      const percentage = ((value / total) * 100).toFixed(2) + '%';
      context.fillText(percentage, textX, textY + 20);

      startAngle += sliceAngle;
    });
  }, [labels, dailyData, weeklyData, monthlyData, yearlyData, timeFrame]);

  return (
    <div className='flex  flex-col'>
      <div className='flex flex-row justify-around'>
        <h1 className='mb-2 self-center text-center '>{title}</h1>
        <select onChange={(e) => setTimeFrame(e.target.value)} className='mb-2'>
          <option value='Daily'>Hoy</option>
          <option value='Weekly'>Semana</option>
          <option value='Monthly'>Mes</option>
          <option value='Yearly'>Año</option>
        </select>
      </div>
      <canvas
        className='h-[300px] md:w-full'
        width={360}
        height={360}
        ref={canvasRef}
      ></canvas>
    </div>
  );
}
