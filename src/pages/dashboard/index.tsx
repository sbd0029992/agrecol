/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import DonutChart from 'components/DonusGraphic';
import LineChart from 'components/LineChart';
import PieChart from 'components/PieGraphic';
import TopProductsTable from 'components/TopProductsTable';
import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();

const DashboardContent = () => {
  const { data, isLoading, error } = useQuery('dashboardData', async () => {
    const response = await axios.get('/api/dashboard');
    return response.data;
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.toString()}</div>;

  return (
    <div className='flex h-full min-h-[90vh] flex-wrap items-center justify-center gap-4 bg-gray-100 px-2 sm:gap-4'>
      <TopProductsTable data={data.topProducts} />g
      <LineChart
        weeklyData={data.weeklySales}
        monthlyData={data.monthlySales}
      />
      <DonutChart
        labels={data.cashierSales.map(
          (cashier: { cashier: any }) => cashier.cashier
        )}
        data={data.cashierSales.map((cashier: { sales: any }) => cashier.sales)}
      />
      <PieChart
        labels={['Revenue', 'Cost', 'Profit']}
        title='Financial Overview'
        dailyData={[
          data.totalProfit.totalRevenue,
          data.totalProfit.totalCost,
          data.totalProfit.totalProfit,
        ]}
        weeklyData={[
          data.totalProfit.totalRevenue,
          data.totalProfit.totalCost,
          data.totalProfit.totalProfit,
        ]}
        monthlyData={[
          data.totalProfit.totalRevenue,
          data.totalProfit.totalCost,
          data.totalProfit.totalProfit,
        ]}
        yearlyData={[
          data.totalProfit.totalRevenue,
          data.totalProfit.totalCost,
          data.totalProfit.totalProfit,
        ]}
        cashierSales={data.cashierSales}
      />
    </div>
  );
};

const DashboardPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContent />
    </QueryClientProvider>
  );
};

export default DashboardPage;
