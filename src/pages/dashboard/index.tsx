import DonusChart from 'components/DonusGraphic';
import LineChart from 'components/LineChart';
import { useWeeklyConsumptionData } from 'pages/hooks/dashboard/useWeeklyConsumptionData';

const DashboardPage = () => {
  const dataForWeek = useWeeklyConsumptionData();

  const monthDataSold = [50, 20, 30, 50, 100, 80, 90, 200, 150, 50, 90, 300];

  const cajeroNames = ['Juan', 'Pedro', 'Maria', 'Jose'];
  const cajeroSold = [20, 20, 10, 20];

  return (
    <div className='flex h-full min-h-[90vh] flex-wrap items-center justify-center gap-4 bg-gray-100 px-2 sm:gap-4'>
      <LineChart
        weeklyData={dataForWeek.resultArray}
        monthlyData={monthDataSold}
      />
      <DonusChart labels={cajeroNames} data={cajeroSold} />
    </div>
  );
};

export default DashboardPage;
