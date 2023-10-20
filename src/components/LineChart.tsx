/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Chart from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';

type LineChartProps = {
  weeklyData: (number | null)[];
  monthlyData: number[];
  monthlyLabels?: string[];
  level?: any;
};

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
  level,
}) => {
  const [chart, setChart] = useState<Chart | null>(null);
  const [timeFrame, setTimeFrame] = useState('Weekly');
  const chartRef = useRef<HTMLCanvasElement>(null);

  const maxData: any = [],
    minData: any = [];

  for (let i = 0; i < weeklyData.length; i += 2) {
    maxData.push(
      level && weeklyData[i] !== null ? level - weeklyData[i] : weeklyData[i]
    );
    minData.push(
      level && weeklyData[i + 1] !== null
        ? level - weeklyData[i + 1]
        : weeklyData[i + 1]
    );
  }
  const maxValue = Math.max(...maxData, ...minData);

  useEffect(() => {
    let labels: any = [];

    let maxTimeLineData = [],
      minTimeLineData = [];

    if (timeFrame === 'Weekly') {
      const today = new Date();
      labels = Array.from({ length: 7 }, (_, i) =>
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - (6 - i)
        ).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
      );
      maxTimeLineData = maxData.slice(0, 7);
      minTimeLineData = minData.slice(0, 7);
    } else if (timeFrame === 'Monthly') {
      labels = monthlyLabels;

      for (let i = 0; i < monthlyData.length; i += 2) {
        maxTimeLineData.push(monthlyData[i] !== null ? monthlyData[i] : 0);
        minTimeLineData.push(
          monthlyData[i + 1] !== null ? monthlyData[i + 1] : 0
        );
      }
    }

    const config = {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Altura Maxima',
            borderColor: '#33FF57',
            fill: false,
            pointRadius: 6,
            pointBackgroundColor: '#33FF57',
            data: minTimeLineData,
          },
          {
            label: 'Altura Minima',
            borderColor: '#FF5733',
            fill: false,
            pointRadius: 6,
            pointBackgroundColor: '#FF5733',
            data: maxTimeLineData,
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
  }, [weeklyData, monthlyData, timeFrame]);

  return (
    <div className='w-[300px] bg-gray-500'>
      <div className='relative mb-6 flex w-full min-w-0 flex-col break-words rounded shadow-lg'>
        <div className='mb-0 flex justify-between rounded-t bg-transparent px-4 py-3'>
          <h2 className='text-xl font-semibold text-white'>Mínimo y máximo</h2>
          <div>
            <select
              onChange={(e) => setTimeFrame(e.target.value)}
              className='mr-2 rounded bg-white text-black'
            >
              <option value='Weekly'>Semanal</option>
              <option value='Monthly'>Mensual</option>
            </select>
          </div>
        </div>
        <div className='flex-auto'>
          <canvas width={300} height={300} ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
