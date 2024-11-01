import { RecordFormDialogService } from './record-form-dialog/record-form-dialog.service';
import { inject, Injectable } from '@angular/core';
import { Record, RemovedRecords } from '../records/records.model';
import { Filter } from '../filters/filter.model';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  throwError,
} from 'rxjs';
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
  private recordFormDialogService = inject(RecordFormDialogService);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private removedRecordsSubject = new BehaviorSubject<RemovedRecords>({
    // '23491': true,
    // '23403': true,
  });
  private updatedRecords$ = this.recordFormDialogService.updatedRecordsHash$;

  public isLoading$ = this.isLoadingSubject.asObservable();
  public displayedColumns = displayedColumns;
  public removedRecords$ = this.removedRecordsSubject.asObservable();

  setIsLoading(value: boolean): void {
    this.isLoadingSubject.next(value);
  }

  getRecordBySerialNumber$(serialNumber: string): Observable<Record | null> {
    return this.httpClient.get<Record[]>(this.jsonUrl).pipe(
      map(
        (records: Record[]) =>
          records.find((record) => record.serialNumber === serialNumber) || null
      ),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(error.message));
      })
    );
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
    const removedRecords: RemovedRecords = {
      ...this.removedRecordsSubject.getValue(),
      [recordSerialNumber]: true,
    };
    this.removedRecordsSubject.next(removedRecords);
  }

  private fetchRecords(
    url: string,
    errorMessage: string,
    filter: Filter
  ): Observable<Record[] | []> {
    return combineLatest([
      this.httpClient.get<Record[]>(url),
      of(this.filterSerice.getFilterConditions(filter)),
      this.removedRecords$,
      this.updatedRecords$,
    ]).pipe(
      map(([resData, filterConditions, removedRecords, updatedRecords]) => {
        let records = resData;

        // apply main filter on records
        if (filterConditions) {
          for (const condition of filterConditions) {
            if (condition) {
              records = records.filter(condition);
            }
          }
        }

        // apply filter on removed records
        if (Object.keys(removedRecords)) {
          records = records.filter(
            (record) => removedRecords[record.serialNumber] !== true
          );
        }

        // apply changes from updated records
        if (Object.keys(updatedRecords)) {
          records = records.map((record) => {
            if (updatedRecords[record.serialNumber]) {
              console.log(updatedRecords[record.serialNumber]);
              return updatedRecords[record.serialNumber];
            }
            return record;
          });
        }

        // update records length on paginator
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
