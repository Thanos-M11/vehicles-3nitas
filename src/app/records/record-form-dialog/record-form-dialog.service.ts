import { Injectable } from '@angular/core';
import { Record, RemovedRecords } from '../records.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { dateToString, isDate, stringToDate } from '../../helper/helper';

@Injectable({ providedIn: 'root' })
export class RecordFormDialogService {
  private updatedRecordsHashSubject = new BehaviorSubject<{
    [key: string]: Record;
  }>({});
  private removedRecordsSubject = new BehaviorSubject<RemovedRecords>({});

  public updatedRecordsHash$: Observable<{ [key: string]: Record }> =
    this.updatedRecordsHashSubject.asObservable();
  public removedRecords$ = this.removedRecordsSubject.asObservable();

  private currentHash: { [key: string]: Record } = {};

  addUpdatedRecord(record: Record): void {
    this.currentHash[record.serialNumber] = {
      ...record,
      issueDate: isDate(record.issueDate)
        ? dateToString(record.issueDate as Date)
        : record.issueDate,
    };
    this.updatedRecordsHashSubject.next(this.currentHash);
    console.log(this.currentHash);
  }

  softRemoveRecord(recordSerialNumber: string): void {
    const removedRecords: RemovedRecords = {
      ...this.removedRecordsSubject.getValue(),
      [recordSerialNumber]: true,
    };
    this.removedRecordsSubject.next(removedRecords);
  }
}
