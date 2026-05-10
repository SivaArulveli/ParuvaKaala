export interface SatelliteData {
  ndvi: number;
  vci: number;
  soilMoisture: string;
}

// Mocking Satellite Data from Google Earth Engine / Sentinel-2
export async function getSatelliteData(lat: number, lon: number): Promise<SatelliteData> {
  // In a real app, this would call Earth Engine API or Bhuvan API
  return {
    ndvi: 0.65 + (Math.random() * 0.2), // Optimal is > 0.6
    vci: 75 + (Math.random() * 15),
    soilMoisture: Math.random() > 0.5 ? 'Optimal' : 'Low'
  };
}
