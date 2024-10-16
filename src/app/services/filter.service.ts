import { Injectable } from '@angular/core';
import { Filter } from '../filters/filter.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilterService {
  private filterSubject = new BehaviorSubject<Filter>({
    serialNumber: '',
    startDate: undefined,
    endDate: undefined,
    driverId: undefined,
    isApproved: undefined,
    plate: undefined,
  });

  filter$ = this.filterSubject.asObservable();

  constructor() {}

  setFilter(newFilter: Filter): void {
    this.filterSubject.next({
      serialNumber: newFilter.serialNumber,
      startDate: newFilter.startDate,
      endDate: newFilter.endDate,
      driverId: newFilter.driverId,
      isApproved: newFilter.isApproved,
      plate: newFilter.plate,
    });
    console.log(newFilter);
  }

  clearFilter() {
    this.filterSubject.next({
      serialNumber: '',
      startDate: undefined,
      endDate: undefined,
      driverId: undefined,
      isApproved: undefined,
      plate: undefined,
    });
  }
}
