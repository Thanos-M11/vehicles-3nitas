import { Component, inject, OnInit } from '@angular/core';
import { RecordsService } from '../services/records.service';
import { FilterService } from '../services/filter.service';
import { RecordComponent } from './record/record.component';
import { RecordState } from './records.model';
import { combineLatest, Observable, of, switchMap } from 'rxjs';
import { PaginationService } from '../services/pagination.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [RecordComponent, AsyncPipe],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css',
})
export class RecordsComponent implements OnInit {
  private recordsService = inject(RecordsService);
  private filterService = inject(FilterService);
  private paginationService = inject(PaginationService);

  records$!: Observable<RecordState>;
  tableHeadings!: string[];

  constructor() {}

  ngOnInit() {
    this.tableHeadings = this.recordsService.tableHeadings;
    this.records$ = combineLatest([
      this.filterService.filter$,
      this.paginationService.batchSize$,
      this.paginationService.currentBatch$,
    ]).pipe(
      switchMap(([filter, batchSize, currentBatch]) => {
        const filteredRecords = this.recordsService.getFilteredRecords(filter);
        const start = currentBatch * batchSize - batchSize;
        const end = currentBatch * batchSize;
        return of(filteredRecords.slice(start, end));
      })
    );
  }
}
