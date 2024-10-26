import { inject, Injectable } from '@angular/core';
import { Record } from '../records/records.model';
import { Filter } from '../filters/filter.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { SharedPaginationService } from '../paginator/shared-pagination.service';
import { FilterService } from '../filters/filter.service';

const displayedColumns = [
  'serialNumber',
  'fullName',
  'issueDate',
  'isApproved',
  'tierAmount',
  'registrationAmount',
  'consumptionAmount',
  'rewardAmount',
  'actions',
];

@Injectable({ providedIn: 'root' })
export class RecordsService {
  private httpClient = inject(HttpClient);
  private filterSerice = inject(FilterService);
  private jsonUrl = 'data/records.json';
  private sharedPaginationService = inject(SharedPaginationService);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private deletedRecords: string[] = [];

  public isLoading$ = this.isLoadingSubject.asObservable();
  public displayedColumns = displayedColumns;

  setIsLoading(value: boolean): void {
    this.isLoadingSubject.next(value);
  }

  loadRecords$(filter: Filter): Observable<Record[] | []> {
    this.setIsLoading(true);
    return this.fetchRecords(
      this.jsonUrl,
      'Something went wrong fetching records',
      filter
    );
  }

  softRemoveRecord(recordSerialNumber: string): void {
    this.deletedRecords.push(recordSerialNumber);
  }

  private fetchRecords(
    url: string,
    errorMessage: string,
    filter: Filter
  ): Observable<Record[] | []> {
    return this.httpClient.get<Record[]>(url).pipe(
      map((resData) => {
        let records = resData;
        if (filter) {
          const filterConditions =
            this.filterSerice.getFilterConditions(filter);
          for (const condition of filterConditions) {
            if (condition) {
              records = records.filter(condition);
            }
          }
        }

        this.sharedPaginationService.setLength(records.length);
        this.setIsLoading(false);
        return records;
      }),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(error.message));
      })
    );
  }
}
