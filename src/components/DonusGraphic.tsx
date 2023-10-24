/* eslint-disable react-hooks/exhaustive-deps */
import { DonutChartProps } from 'interface/type';
import React, { useEffect, useRef } from 'react';

export default function DonutChart({ labels, data }: DonutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const colors = Array(data.length)
    .fill('')
    .map(() => {
      const red = Math.floor(Math.random() * 156) + 100;
      const green = Math.floor(Math.random() * 156) + 100;
      const blue = Math.floor(Math.random() * 156) + 100;
      return '#' + red.toString(16) + green.toString(16) + blue.toString(16);
    });

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

    // Agregar una matriz para almacenar los porcentajes
    const percentages = data.map((value) => (value / total) * 100);

    data.forEach((value, index) => {
      const sliceAngle = (2 * Math.PI * value) / total;
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
      context.fillStyle = colors[index];
      context.fill();

      // Dibuja el porcentaje en el centro de la sección de la dona
      const midAngle = startAngle + sliceAngle / 2;
      const x = canvas.width / 2 + Math.cos(midAngle) * (canvas.width / 4); // Ajusta el radio del texto
      const y = canvas.height / 2 + Math.sin(midAngle) * (canvas.height / 4); // Ajusta el radio del texto
      context.fillStyle = '#000'; // Cambia esto al color de texto que prefieras
      context.font = '14px Arial'; // Ajusta el tamaño y fuente del texto
      context.textAlign = 'center';
      context.fillText(`${percentages[index].toFixed(1)}%`, x, y);

      startAngle += sliceAngle;
    });

    // Dibuja un círculo blanco en el centro para crear el efecto de dona
    context.beginPath();
    context.arc(
      canvas.width / 2,
      canvas.height / 2,
      Math.min(canvas.width / 2, canvas.height / 2) / 2.5, // Ajusta el divisor para cambiar el grosor de la dona
      0,
      2 * Math.PI
    );
    context.fillStyle = '#fff'; // Cambia esto al color de fondo que prefieras
    context.fill();
  }, [labels, data]);

  return (
    <div className='flex flex-col items-center'>
      <h1 className='mb-2 text-center'>Cajero con mas ventas</h1>
      <canvas
        className='h-[300px] md:w-full'
        width={360}
        height={360}
        ref={canvasRef}
      ></canvas>
      <div className='mt-4 flex justify-center'>
        {labels.map((label, index) => (
          <div key={index} className='mx-2 flex items-center'>
            <div
              style={{ backgroundColor: colors[index] }}
              className='mr-2 h-4 w-4 rounded-full'
            ></div>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
