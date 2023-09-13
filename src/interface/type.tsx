export interface PieChartProps {
  labels: string[];
  title: string;
  dailyData?: number[];
  weeklyData?: number[];
  monthlyData?: number[];
  yearlyData?: number[];
}
export interface PieChartSoldProps {
  labels: string[];
  data: number[];
  title: string;
}

export interface DonusChartProps {
  labels: string[];
  data: number[];
}
export interface RadarChartProps {
  labels: string[];
  data: number[];
}

// LineChart.tsx
export interface LineChartProps {
  nameTank?: string;
  weeklyData: number[];
  monthlyData: number[];
  weeklyLabels?: string[];
  monthlyLabels?: string[];
}
