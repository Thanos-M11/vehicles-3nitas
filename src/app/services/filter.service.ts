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

  private filterIsActiveSubject = new BehaviorSubject<boolean>(false);

  public filter$ = this.filterSubject.asObservable();
  public filterIsActive$ = this.filterIsActiveSubject.asObservable();

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
    this.setFilterOn();
  }

  setFilterOn() {
    this.filterIsActiveSubject.next(true);
  }

  setFilterOff() {
    this.filterIsActiveSubject.next(false);
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
    this.setFilterOff();
  }
}
