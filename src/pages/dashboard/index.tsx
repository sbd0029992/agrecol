import DonutChart from 'components/DonusGraphic';
import LineChart from 'components/LineChart';
import TopProductsTable from 'components/TopProductsTable';
import withSession from 'lib/session';
import { useCashierSalesData } from 'pages/hooks/dashboard/useCashierSalesData';
import { useTopProductsSold } from 'pages/hooks/dashboard/useTopProductsSold';
import { useWeeklyConsumptionData } from 'pages/hooks/dashboard/useWeeklyConsumptionData';
import { useYearlyConsumptionData } from 'pages/hooks/dashboard/useYearlyConsumptionData';
import { useServerSidePermission } from 'pages/hooks/permission/useServerSidePermission';

const DashboardPage = () => {
  const dataForWeek = useWeeklyConsumptionData();
  const dataForYear = useYearlyConsumptionData();

  const cashierSalesData = useCashierSalesData();
  const topProductsData = useTopProductsSold();

  return (
    <div className='flex h-full min-h-[90vh] flex-wrap items-center justify-center gap-4 bg-gray-100 px-2 sm:gap-4'>
      <TopProductsTable data={topProductsData.topProducts} />
      <LineChart
        weeklyData={dataForWeek.resultArray}
        monthlyData={dataForYear.resultArray}
      />
      <DonutChart
        labels={cashierSalesData.cajeroNames}
        data={cashierSalesData.cajeroSold}
      />
    </div>
  );
};

export const getServerSideProps = withSession(useServerSidePermission);

export default DashboardPage;
