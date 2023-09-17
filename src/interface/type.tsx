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

export interface AuthServiceProps {
  validate: (password: string, dbPassword: string) => Promise<boolean>;
}

export interface IronSessionProps {
  password: string;
  cookieName: string;
}

// RegisterUser.tsx
export interface NewUser {
  name: string;
  email: string;
  password?: string;
  status: string;
  type: string;
}
