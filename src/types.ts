export interface ConfigData {
  appName: string;
  year: number;
  month: number;
  defaultDailyTax: number;
}

export interface NightlyStay {
  id: string;
  entryDate: string;
  numGuests: number;
  numNights: number;
  firstName: string;
  lastName: string;
  numMinors: number;
  dailyTax: number;
  month: number;
  totalTax: number;
}

export interface MonthlyTotal {
  month: number;
  totalTax: number;
  totalNights: number;
  totalGuests: number;
}

export interface TrimesterTotal {
  trimester: number;
  totalTax: number;
  totalNights: number;
  totalGuests: number;
}