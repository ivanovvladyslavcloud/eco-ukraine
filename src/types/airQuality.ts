export interface AirQualityData {
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  o3: number;
}

export interface TimeSeriesMeasurement {
  timestamp: string; 
  values: AirQualityData;
}