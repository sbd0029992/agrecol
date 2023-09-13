import DonusChart from 'components/DonusGraphic';
import LineChart from 'components/LineChart';
import PieChart from 'components/PieGraphic';
import PieChartStock from 'components/PieGraphicStock';

const index = () => {
  const dailyData = [20, 20, 10, 20, 5];
  const weeklyData = [20, 20, 10, 20, 5];
  const monthlyData = [50, 20, 30, 50, 10];
  const yearlyData = [20, 20, 10, 20, 5];
  const labels = ['Platano', 'Limon', 'Durazno', 'Manzana', 'Cafe'];

  const weekDataSold = [20, 20, 10, 20, 5, 5];
  const monthDataSold = [50, 20, 30, 50, 100, 80, 90, 200, 150, 50, 90, 300];

  const cajeroNames = ['Juan', 'Pedro', 'Maria', 'Jose'];
  const cajeroSold = [20, 20, 10, 20];

  const productSoldLabel = ['Piña', 'Platano', 'manzana'];
  const productSoldData = [20, 100, 50];

  return (
    <div className='flex h-full min-h-[90vh] flex-wrap items-center justify-center gap-4 bg-gray-100 px-2 sm:gap-4'>
      <PieChart
        labels={labels}
        dailyData={dailyData}
        weeklyData={weeklyData}
        monthlyData={monthlyData}
        yearlyData={yearlyData}
        title='Producto mas vendido '
      />
      <LineChart weeklyData={weekDataSold} monthlyData={monthDataSold} />
      <DonusChart labels={cajeroNames} data={cajeroSold} />
      <PieChartStock
        labels={productSoldLabel}
        data={productSoldData}
        title='Cantidad de productos '
      />
    </div>
  );
};

export default index;
