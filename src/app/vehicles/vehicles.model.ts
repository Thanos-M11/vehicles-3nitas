export interface Driver {
  id: string;
  fullName: string;
}

export type DriverState = Driver[];

export interface Vehicle {
  id: number;
  plate: string;
}

export type VehicleState = Vehicle[];
