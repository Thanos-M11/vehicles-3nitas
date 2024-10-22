import { Injectable } from '@angular/core';

import vehiclesData from '../../../backend/data/vehicles.json';
import { Vehicle, VehicleState } from '../vehicles/vehicles.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VehiclesService {
  private vehicles: VehicleState = [];
  private selectedVehicleSubject = new BehaviorSubject<Vehicle | null>(null);

  selectedVehicle$ = this.selectedVehicleSubject.asObservable();

  constructor() {
    this.vehicles = vehiclesData;
  }

  getVehicles() {
    return this.vehicles;
  }

  getVehicleById(vehicleId: number) {
    return this.vehicles.filter((vehicle) => vehicle.id === vehicleId);
  }

  setSelectedVehicle(plate: string): void {
    this.selectedVehicleSubject.next(
      this.vehicles.find((vehicle) => vehicle.plate === plate)!
    );
  }
}
