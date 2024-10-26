import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, map, throwError } from 'rxjs';
import { Driver } from '../drivers/drivers.model';

@Injectable({ providedIn: 'root' })
export class DriversService {
  private httpClient = inject(HttpClient);

  loadDrivers$() {
    return this.fetchDrivers(
      'http://localhost:3000/drivers',
      'Something went wrong fetching drivers'
    );
  }

  private fetchDrivers(url: string, errorMessage: string) {
    return this.httpClient.get<{ drivers: Driver[] }>(url).pipe(
      map((resData) => resData.drivers),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
