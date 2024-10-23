import { SharedPaginationService } from './shared-pagination.service';
import { inject, Injectable } from '@angular/core';
import { Record, RecordState } from '../records/records.model';
import { Filter } from '../filters/filter.model';
import { formatDate } from '../helper/helper';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecordsService {
  private httpClient = inject(HttpClient);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  public isLoading$ = this.isLoadingSubject.asObservable();

  public displayedColumns = [
    'serialNumber',
    'fullName',
    'issueDate',
    'isApproved',
    'tierAmount',
    'registrationAmount',
    'consumptionAmount',
    'rewardAmount',
  ];

  sharedPaginationService = inject(SharedPaginationService);

  setIsLoading(value: boolean): void {
    this.isLoadingSubject.next(value);
  }

  loadRecords$(filter: Filter): Observable<Record[] | []> {
    this.setIsLoading(true);
    return this.fetchRecords(
      'http://localhost:3000/records',
      'Something went wrong fetching records',
      filter
    );
  }

  private fetchRecords(
    url: string,
    errorMessage: string,
    filter: Filter
  ): Observable<Record[] | []> {
    return this.httpClient.get<{ records: Record[] }>(url).pipe(
      map((resData) => {
        let records = resData.records;

        if (filter) {
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
                  formatDate(record.issueDate).getTime() <=
                  filter.endDate!.getTime()
              : null,

            filter.driverId
              ? (record: Record) => record.driverId === filter.driverId
              : null,

            filter.isApproved === '0'
              ? (record: Record) => record.isApproved === false
              : filter.isApproved === '1'
              ? (record: Record) => record.isApproved === true
              : null,

            filter.plate
              ? (record: Record) => record.plate === filter.plate
              : null,
          ];

          // applying conditions
          for (const condition of filterConditions) {
            if (condition) {
              records = records.filter(condition);
            }
          }
        }

        this.updateTotalPages(records.length);
        this.setIsLoading(false);
        return records;
      }),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  private updateTotalPages(length: number): void {
    this.sharedPaginationService.setLength(length);
  }
}
