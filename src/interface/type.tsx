/* eslint-disable unused-imports/no-unused-vars */
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
export interface NewUserProps {
  name: string;
  email: string;
  gender: string;
  birthdate: string;
  ci: string;
  phone: string;
  password: string;
}

export interface RackProps {
  name: string;
  description: string;
  status: string;
  type: string;
}

export type ResponseType<T> = {
  data: T | null;
  error: Error | null;
};

export type UseMutationResponse<T> = {
  response: Response | null;
  error: Error | null;
  mutate: () => Promise<void>;
};

export interface DataCookieType {
  isLoggedIn: boolean;
  idUser: string;
  type: string;
  name: string;
}
