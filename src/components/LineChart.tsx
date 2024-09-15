/* eslint-disable @typescript-eslint/no-explicit-any */
import Chart from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';

const LineChart: React.FC<{ weeklyData: any[]; monthlyData: any[] }> = ({
  weeklyData,
  monthlyData,
}) => {
  const [chart, setChart] = useState<Chart | null>(null);
  const [timeFrame, setTimeFrame] = useState('Weekly');
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let data, labels;

    if (timeFrame === 'Weekly') {
      data = weeklyData.map((sale) => sale.quantity);
      labels = weeklyData.map((sale) =>
        new Date(sale.createdAt).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: 'short',
        })
      );
    } else {
      data = monthlyData.map((sale) => sale.quantity);
      labels = monthlyData.map((sale) =>
        new Date(sale.createdAt).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: 'short',
        })
      );
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
            label: 'Sales',
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
      },
    };

    if (chart) chart.destroy();
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        setChart(new Chart(ctx, config as any));
      } else {
        console.error('Canvas context is null');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weeklyData, monthlyData, timeFrame]);

  return (
    <div className=''>
      <div className='flex justify-around rounded-t bg-transparent px-4 py-3'>
        <h2 className='self-center text-base'>
          {timeFrame === 'Weekly' ? 'Weekly Sales' : 'Monthly Sales'}
        </h2>
        <div>
          <select
            onChange={(e) => setTimeFrame(e.target.value)}
            className='mr-2 rounded bg-white text-black'
          >
            <option value='Weekly'>Weekly</option>
            <option value='Monthly'>Monthly</option>
          </select>
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
