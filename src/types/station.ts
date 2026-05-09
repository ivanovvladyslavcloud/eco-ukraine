export type StationType = "urban" | "industrial" | "rural";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface MonitoringStation {
  id: string;
  name: string;
  location: Coordinates;
  type: StationType;
}