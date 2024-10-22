import { Injectable, signal } from '@angular/core';

import driversData from '../../../backend/data/drivers.json';
import { DriverState } from '../vehicles/vehicles.model';

@Injectable({ providedIn: 'root' })
export class DriversService {
  private drivers: DriverState = [];

  constructor() {
    this.drivers = driversData;
  }

  getDrivers() {
    return this.drivers;
  }
}
