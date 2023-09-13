import { PieChartSoldProps } from 'interface/type';
import React, { useEffect, useRef } from 'react';

export default function PieChartStock({
  labels,
  data,
  title,
}: PieChartSoldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const randomColor = () => {
    const red = Math.floor(Math.random() * 156) + 100;
    const green = Math.floor(Math.random() * 156) + 100;
    const blue = Math.floor(Math.random() * 156) + 100;
    return '#' + red.toString(16) + green.toString(16) + blue.toString(16);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('El contexto del canvas es null');
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      console.error('El contexto del canvas es null');
      return;
    }

    const total = data.reduce((acc, value) => acc + value, 0);
    let startAngle = 0;

    data.forEach((value, index) => {
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

      const dataValue = value.toFixed(2); // Redondear el valor
      context.fillText(dataValue, textX, textY + 20);

      startAngle += sliceAngle;
    });
  }, [labels, data]);

  return (
    <div className='flex flex-col'>
      <h1 className='mb-2 text-center '>{title}</h1>
      <canvas
        className='h-[300px] md:w-full'
        width={360}
        height={360}
        ref={canvasRef}
      ></canvas>
    </div>
  );
}
