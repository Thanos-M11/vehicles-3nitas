import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';
import { Driver } from '../models/drivers.model';

@Injectable({ providedIn: 'root' })
export class DriversService {
  private httpClient = inject(HttpClient);
  private jsonUrl = 'data/drivers.json';

  loadDrivers$(): Observable<Driver[]> {
    return this.fetchDrivers(
      this.jsonUrl,
      'Something went wrong fetching drivers'
    );
  }

  private fetchDrivers(
    url: string,
    errorMessage: string
  ): Observable<Driver[]> {
    return this.httpClient.get<Driver[]>(url).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
