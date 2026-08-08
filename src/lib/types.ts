export type Language = 'en' | 'ta';

export interface PanchangamData {
  tithi: string;
  tithiNumber: number; // 1-30
  paksha: 'Shukla' | 'Krishna';
  nakshatra: string;
  nakshatraNumber: number; // 1-27
  yoga: string;
  karana: string;
  vara: string; // Day of week
  sunSign: string; // Zodiac/Rasi
  tamilMonth: string; // Chithirai, Vaikasi, etc.
  moonPhasePercent: number; // 0 - 100%
  sapFlowState: 'High (Rising)' | 'Peak' | 'Low (Receding)' | 'Minimum';
  isAuspiciousForSowing: boolean;
}

export interface SoilMoistureData {
  surfaceMoisture: number; // 0 - 100 % volumetric
  deepMoisture: number; // 0 - 100 % volumetric
  status: 'Optimal' | 'Low' | 'High' | 'Critical Dry';
  temperature: number; // °C
  humidity: number; // %
  et0: number; // Evapotranspiration mm/day
  precipitationForecast7d: number; // mm total
}

export interface SatelliteData {
  ndvi: number; // 0 - 1.0
  vci: number; // Vegetation Condition Index %
  canopyDensity: string;
}

export interface PlanWeek {
  week: number;
  tamilMonth: string;
  gregorianDate: string;
  panchangam: PanchangamData;
  soil: SoilMoistureData;
  satellite: SatelliteData;
  task: string;
  tamilTask: string;
  taskCategory: 'sowing' | 'irrigation' | 'fertilizer' | 'weeding' | 'pest' | 'harvest';
  auspiciousReason: string;
  tamilAuspiciousReason: string;
}

export interface LocationInfo {
  id: string;
  name: string;
  tamilName: string;
  district: string;
  lat: number;
  lon: number;
  region: string;
}

export interface CropInfo {
  id: string;
  name: string;
  tamilName: string;
  durationWeeks: number;
  icon: string;
  description: string;
  tamilDescription: string;
  waterNeed: 'High' | 'Medium' | 'Low';
  idealPaksha: 'Shukla' | 'Krishna' | 'Any';
  favoredNakshatras: string[];
}

export interface SavedPlanRecord {
  id: string;
  userId: string;
  cropId: string;
  locationName: string;
  lat: number;
  lon: number;
  createdAt: string;
  plan: PlanWeek[];
}
