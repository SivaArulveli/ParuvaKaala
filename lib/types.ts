export interface PlanWeek {
  week: number;
  tamilMonth: string;
  gregorianDate: string;
  panchangam: {
    tithi: string;
    nakshatra: string;
    auspicious: boolean;
  };
  satellite: {
    ndvi: number;
    soilMoisture: string;
  };
  task: string;
  tamilTask: string;
}

export interface DashboardProps {
  crop: string;
  location: string;
  startDate: string;
}
