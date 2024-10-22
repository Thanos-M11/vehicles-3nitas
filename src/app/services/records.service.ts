import { SharedPaginationService } from './shared-pagination.service';
import { inject, Injectable } from '@angular/core';
import { Record, RecordState } from '../records/records.model';
import recordData from '../../../backend/data/records.json';
import { Filter } from '../filters/filter.model';
import { formatDate } from '../helper/helper';

@Injectable({ providedIn: 'root' })
export class RecordsService {
  private records: RecordState = [];
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

  constructor() {
    this.records = recordData;
  }

  getFilteredRecords(filter: Filter): RecordState {
    let filteredRecords = [...this.records];

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

    for (const condition of filterConditions) {
      if (condition) {
        filteredRecords = filteredRecords.filter(condition);
      }
    }

    this.updateTotalPages(filteredRecords.length);
    return filteredRecords;
  }

  private updateTotalPages(length: number): void {
    this.sharedPaginationService.setLength(length);
  }
}
