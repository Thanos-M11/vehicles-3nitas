import { inject, Injectable } from '@angular/core';

import { Vehicle, VehicleState } from './vehicles.model';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class VehiclesService {
  private httpClient = inject(HttpClient);
  private jsonUrl = 'data/vehicles.json';
  private vehicles: VehicleState = [];
  private selectedVehicleSubject = new BehaviorSubject<Vehicle | null>(null);

  selectedVehicle$ = this.selectedVehicleSubject.asObservable();

  setSelectedVehicle(plate: string): void {
    this.selectedVehicleSubject.next(
      this.vehicles.find((vehicle) => vehicle.plate === plate)!
    );
  }

  loadVehicles$(): Observable<Vehicle[]> {
    return this.fetchVehicles(
      this.jsonUrl,
      'Something went wrong fetching vehicles'
    );
  }

  private fetchVehicles(
    url: string,
    errorMessage: string
  ): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(url).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
