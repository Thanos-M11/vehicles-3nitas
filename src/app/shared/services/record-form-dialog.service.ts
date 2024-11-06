import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { dateToString, isDate } from '../helper/helper';
import { Record, RemovedRecords } from '../models/records.model';

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
      tierAmount: +record.tierAmount,
      registrationAmount: +record.registrationAmount,
      consumptionAmount: +record.consumptionAmount,
      rewardAmount: +record.tierAmount * +record.consumptionAmount,
    };
    this.updatedRecordsHashSubject.next(this.currentHash);
    // console.log(this.currentHash);
  }

  softRemoveRecord(recordSerialNumber: string): void {
    const removedRecords: RemovedRecords = {
      ...this.removedRecordsSubject.getValue(),
      [recordSerialNumber]: true,
    };
    this.removedRecordsSubject.next(removedRecords);
  }
}
