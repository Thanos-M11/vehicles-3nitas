import { Injectable } from '@angular/core';
import { Filter, FilterCondition } from './filter.model';
import { BehaviorSubject } from 'rxjs';
import { Record } from '../records/records.model';
import { formatDate } from '../helper/helper';

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

  getFilterConditions(filter: Filter): FilterCondition[] {
    const filterConditions = [
      filter.serialNumber
        ? (record: Record) => record.serialNumber === filter.serialNumber
        : null,

      filter.startDate
        ? (record: Record) =>
            formatDate(record.issueDate).getTime() >=
            filter.startDate!.getTime()
        : null,

      filter.endDate
        ? (record: Record) =>
            formatDate(record.issueDate).getTime() <= filter.endDate!.getTime()
        : null,

      filter.driverId
        ? (record: Record) => record.driverId === filter.driverId
        : null,

      filter.isApproved === '0'
        ? (record: Record) => record.isApproved === false
        : filter.isApproved === '1'
        ? (record: Record) => record.isApproved === true
        : null,

      filter.plate ? (record: Record) => record.plate === filter.plate : null,
    ];
    return filterConditions;
  }
}
