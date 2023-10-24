/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Chart from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';

import { LineChartProps } from '../interface/type';

const LineChart: React.FC<LineChartProps> = ({
  weeklyData,
  monthlyData,
  monthlyLabels = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Setiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
}) => {
  const [chart, setChart] = useState<Chart | null>(null);
  const [timeFrame, setTimeFrame] = useState('Weekly');
  const [sliderValue, setSliderValue] = useState(0);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let data, labels;

    if (timeFrame === 'Weekly') {
      const today = new Date();
      const endIndex = weeklyData.length - 1;
      const startIndex = Math.max(endIndex - 6, 0);

      labels = Array.from({ length: 7 }, (_, i) =>
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - (6 - i)
        ).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
      );

      data = Array.from(
        { length: 7 },
        (_, i) => weeklyData[startIndex + i] ?? 0
      );
    } else {
      data = monthlyData.slice(sliderValue, sliderValue + 6);
      labels = monthlyLabels.slice(sliderValue, sliderValue + 6);
    }

    const maxValue = Math.max(...data);
    const pointColor = data.map((value) =>
      value === maxValue ? '#FF0000' : '#04BFDA'
    );

    const config = {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Ventas',
            borderColor: '#FFF',
            pointBackgroundColor: pointColor,
            data,
            fill: false,
            pointRadius: 6,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: { display: false },
        tooltips: {
          enabled: false,
          mode: 'index',
          intersect: false,
          titleFontColor: '#FFFFFF',
          bodyFontColor: '#FFFFFF',
        },
        legend: {
          labels: { fontColor: '#FFFFFF' },
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: '#FFFFFF',
              },
              gridLines: { color: '#8c8c8c' },
            },
          ],
          yAxes: [
            {
              ticks: { fontColor: '#FFFFFF' },
              gridLines: { color: '#8c8c8c' },
            },
          ],
        },
        plugins: {
          annotation: {
            annotations: [
              {
                type: 'line',
                position: 'start',
                yMin: maxValue,
                yMax: maxValue,
                borderColor: '#FF0000',
                borderWidth: 2,
                content: `${maxValue}`,
                offsetY: -15,
                offsetX: 0,
              },
            ],
          },
        },
      },
    };

    if (chart) chart.destroy();
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        setChart(new Chart(ctx, config as any));
      } else {
        console.error('El contexto del canvas es null');
      }
    }
  }, [weeklyData, monthlyData, sliderValue, timeFrame]);

  useEffect(() => {
    setSliderValue(0);
  }, [timeFrame]);

  return (
    <div className=''>
      <div className='flex justify-around rounded-t bg-transparent px-4 py-3'>
        <h2 className='self-center text-base'>
          {timeFrame === 'Weekly' ? 'Dias más Ventas' : 'Mes más Ventas'}
        </h2>
        <div>
          <select
            onChange={(e) => setTimeFrame(e.target.value)}
            className='mr-2 rounded bg-white text-black'
          >
            <option value='Weekly'>Semanal</option>
            <option value='Monthly'>Mensual</option>
          </select>
          {timeFrame === 'Monthly' && (
            <input
              type='range'
              min='0'
              max='6'
              value={sliderValue}
              onChange={(e) => setSliderValue(parseInt(e.target.value))}
              className='...'
            />
          )}
        </div>
      </div>
      <div className='flex-auto bg-slate-500'>
        <div>
          <canvas
            className='h-[300px] '
            width={300}
            height={300}
            ref={chartRef}
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
