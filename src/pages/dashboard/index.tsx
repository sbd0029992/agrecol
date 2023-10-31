import DonutChart from 'components/DonusGraphic';
import LineChart from 'components/LineChart';
import TopProductsTable from 'components/TopProductsTable';
import { useCashierSalesData } from 'hooks/dashboard/useCashierSalesData';
import { useTopProductsSold } from 'hooks/dashboard/useTopProductsSold';
import { useWeeklyConsumptionData } from 'hooks/dashboard/useWeeklyConsumptionData';
import { useYearlyConsumptionData } from 'hooks/dashboard/useYearlyConsumptionData';
import { useServerSidePermission } from 'hooks/permission/useServerSidePermission';
import withSession from 'lib/session';

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
      <div className='flex flex-col md:flex-row'>
        <DonutChart
          labels={cashierSalesData.cajeroNames}
          data={cashierSalesData.cajeroSold}
        />
        <div className='h-[70px] md:hidden'></div>
      </div>
    </div>
  );
};

export const getServerSideProps = withSession(useServerSidePermission);

export default DashboardPage;
