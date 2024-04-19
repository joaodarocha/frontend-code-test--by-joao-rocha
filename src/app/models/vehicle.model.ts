export interface Vehicle {
  id: string;
  name: string;
  modelYear: string;
  apiUrl: string;
  media: Media[];
}

export interface Media {
  name: string;
  url: string;
}

export interface VehicleDetails {
  id: string;
  description: string;
  price: string;
  meta: MetaVehicleData;
}

export interface MetaVehicleData {
  passengers: number;
  drivetrain: string[];
  bodystyles: string[];
  emissions: {
    template: string;
    value: number;
  }
}
