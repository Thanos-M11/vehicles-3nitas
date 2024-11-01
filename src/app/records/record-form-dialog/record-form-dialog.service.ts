import { Injectable } from '@angular/core';
import { Record, RemovedRecords } from '../records.model';
import { BehaviorSubject, Observable } from 'rxjs';

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
    this.currentHash[record.serialNumber] = record;
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
