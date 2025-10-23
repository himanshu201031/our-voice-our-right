
export interface MonthlyData {
  month: string;
  monthHi: string;
  districtValue: number;
  stateValue: number;
}

export interface District {
  id: string;
  name: string;
  nameHi: string;
}

export interface DistrictData extends District {
  state: string;
  totalHouseholds: number;
  totalWorkers: number;
  totalFundsUsed: number; // in Lakhs
  monthlyPerformance: MonthlyData[];
}

export interface StateData {
  name: string;
  nameHi: string;
  districts: District[];
}

export type Language = 'en' | 'hi';
