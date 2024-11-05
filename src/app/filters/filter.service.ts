import { Injectable } from '@angular/core';
import { Filter, FilterCondition } from './filter.model';
import { BehaviorSubject } from 'rxjs';
import { Record } from '../records/records.model';
import { stringToDate } from '../helper/helper';

const initialFilterState = {
  serialNumber: '',
  startDate: undefined,
  endDate: undefined,
  driverId: undefined,
  isApproved: undefined,
  plate: undefined,
};

@Injectable({ providedIn: 'root' })
export class FilterService {
  public initialFilterState = initialFilterState;
  private filterSubject = new BehaviorSubject<Filter>(initialFilterState);

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
    this.filterSubject.next(this.initialFilterState);
    this.setFilterOff();
  }

  getFilterConditions(filter: Filter): FilterCondition[] {
    const filterConditions = [
      filter.serialNumber
        ? (record: Record) => record.serialNumber === filter.serialNumber
        : null,

      filter.startDate
        ? (record: Record) =>
            stringToDate(record.issueDate as string).getTime() >=
            filter.startDate!.getTime()
        : null,

      filter.endDate
        ? (record: Record) =>
            stringToDate(record.issueDate as string).getTime() <=
            filter.endDate!.getTime()
        : null,

      filter.driverId
        ? (record: Record) => record.driverId?.toString() === filter.driverId
        : null,

      filter.isApproved === false
        ? (record: Record) => record.isApproved === false
        : filter.isApproved === true
        ? (record: Record) => record.isApproved === true
        : null,

      filter.plate ? (record: Record) => record.plate === filter.plate : null,
    ];
    return filterConditions;
  }
}
