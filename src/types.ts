export interface ConfigData {
  appName: string;
  year: number;
  month: number;
  defaultDailyTax: number;
  logoUrl: string;
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
  preStayNotes: string;
  postStayNotes: string;
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