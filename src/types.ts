export interface Earthquake {
  id: string;
  properties: {
    mag: number;
    place: string;
    time: number;
    url: string;
    title: string;
    alert: string | null;
    tsunami: number;
    depth: number;
  };
  geometry: {
    coordinates: [number, number, number];
  };
}

export interface EarthquakeFeature {
  type: string;
  features: {
    type: string;
    properties: Earthquake['properties'];
    geometry: Earthquake['geometry'];
    id: string;
  }[];
}