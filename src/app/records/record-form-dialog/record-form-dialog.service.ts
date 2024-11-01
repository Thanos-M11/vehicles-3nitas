import { Injectable } from '@angular/core';
import { Record } from '../records.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { formatIssueDate } from '../../helper/helper';

@Injectable({ providedIn: 'root' })
export class RecordFormDialogService {
  private updatedRecordsHashSubject = new BehaviorSubject<{
    [key: string]: Record;
  }>({});
  public updatedRecordsHash$: Observable<{ [key: string]: Record }> =
    this.updatedRecordsHashSubject.asObservable();

  addUpdatedRecord(record: Record): void {
    const updatedRecord = {
      ...record,
      tierAmount: +record.tierAmount,
      registrationAmount: +record.registrationAmount,
      consumptionAmount: +record.consumptionAmount,
      rewardAmount:
        Math.round(+record.tierAmount * +record.consumptionAmount * 100) / 100,
    };

    const newHash = {
      [record.serialNumber]: updatedRecord,
    };

    this.updatedRecordsHashSubject.next(newHash);
    console.log(newHash);
  }
}
