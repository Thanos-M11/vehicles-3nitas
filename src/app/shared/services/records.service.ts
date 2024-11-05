import { inject, Injectable } from '@angular/core';
import {
  Record,
  RemovedRecords,
  UpdatedRecords,
} from '../models/records.model';
import { Filter, FilterCondition } from '../models/filter.model';
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
import { SharedPaginationService } from './shared-pagination.service';
import { FilterService } from './filter.service';
import { RecordFormDialogService } from './record-form-dialog.service';

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
  private updatedRecords$ = this.recordFormDialogService.updatedRecordsHash$;

  public isLoading$ = this.isLoadingSubject.asObservable();
  public displayedColumns = displayedColumns;
  public removedRecords$ = this.recordFormDialogService.removedRecords$;

  setIsLoading(value: boolean): void {
    this.isLoadingSubject.next(value);
  }

  getRecordBySerialNumber$(serialNumber: string): Observable<Record | null> {
    return combineLatest([
      this.httpClient.get<Record[]>(this.jsonUrl),
      this.updatedRecords$,
    ]).pipe(
      map(([resData, updatedRecords]) => {
        const records = this.getUpdatedRecords(resData, updatedRecords);
        const record: Record | null =
          records.find((rec: Record) => rec.serialNumber === serialNumber) ||
          null;

        return record;
      }),
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
        records = this.getRemovedRecords(records, removedRecords);
        records = this.getUpdatedRecords(records, updatedRecords);
        records = this.getFilteredRecords(records, filterConditions);
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

  private getUpdatedRecords(
    existingRecords: Record[],
    updatedRecords: UpdatedRecords
  ): Record[] {
    let records = existingRecords;
    if (Object.keys(updatedRecords)) {
      records = existingRecords.map((record: Record) => {
        if (updatedRecords[record.serialNumber]) {
          return updatedRecords[record.serialNumber];
        }
        return record;
      });
    }
    return records;
  }

  private getRemovedRecords(
    existingRecords: Record[],
    removedRecords: RemovedRecords
  ): Record[] {
    let records = existingRecords;
    if (Object.keys(removedRecords)) {
      records = existingRecords.filter(
        (record) => removedRecords[record.serialNumber] !== true
      );
    }
    return records;
  }

  private getFilteredRecords(
    existingRecords: Record[],
    filterConditions: FilterCondition[]
  ): Record[] {
    let records = existingRecords;
    if (filterConditions) {
      for (const condition of filterConditions) {
        if (condition) {
          records = records.filter(condition);
        }
      }
    }
    return records;
  }
}
