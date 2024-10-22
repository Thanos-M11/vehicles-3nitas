import { inject, Injectable } from '@angular/core';

import { Vehicle, VehicleState } from '../vehicles/vehicles.model';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class VehiclesService {
  private httpClient = inject(HttpClient);
  private vehicles: VehicleState = [];
  private selectedVehicleSubject = new BehaviorSubject<Vehicle | null>(null);

  selectedVehicle$ = this.selectedVehicleSubject.asObservable();

  loadVehicles$() {
    return this.fetchVehicles(
      'http://localhost:3000/vehicles',
      'Something went wrong fetching vehicles'
    );
  }

  setSelectedVehicle(plate: string): void {
    this.selectedVehicleSubject.next(
      this.vehicles.find((vehicle) => vehicle.plate === plate)!
    );
  }

  private fetchVehicles(url: string, errorMessage: string) {
    return this.httpClient.get<{ vehicles: Vehicle[] }>(url).pipe(
      map((resData) => resData.vehicles),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
