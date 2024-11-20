import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FilterService } from '../../shared/services/filter.service';
import { Record } from '../../shared/models/records.model';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProgressSpinnerComponent } from '../../shared/components/progress-spinner/progress-spinner.component';

import { PaginatorService } from '../../shared/services/paginator.service';
import { ActionsComponent } from './actions/actions.component';
import { EuroPipe } from '../../shared/pipes/euro.pipe';
import { UnitPipe } from '../../shared/pipes/unit.pipe';
import { RecordIssueDatePipe } from '../../shared/pipes/record-issue-date.pipe';
import { ApprovedPipe } from '../../shared/pipes/approved.pipe';
import { RecordsService } from '../../shared/services/records.service';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [
    AsyncPipe,
    MatTableModule,
    EuroPipe,
    UnitPipe,
    DecimalPipe,
    RecordIssueDatePipe,
    DatePipe,
    ApprovedPipe,
    ProgressSpinnerComponent,
    ActionsComponent,
  ],
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss',
})
export class RecordsComponent implements OnInit {
  private recordsService = inject(RecordsService);
  private filterService = inject(FilterService);
  private paginatorService = inject(PaginatorService);
  private destroyRef = inject(DestroyRef);

  public formatedIssueDate!: Date;
  public records$!: Observable<Record[]>;
  public displayedColumns!: string[];
  public isLoading$ = this.recordsService.isLoading$;
  public dataSource = new MatTableDataSource<Record>();

  constructor() {}

  ngOnInit() {
    this.displayedColumns = this.recordsService.displayedColumns;
    this.records$ = combineLatest([
      this.filterService.filter$,
      this.paginatorService.pageSize$,
      this.paginatorService.pageIndex$,
    ]).pipe(
      switchMap(([filter, pageSize, pageIndex]) =>
        this.recordsService.loadRecords$(filter).pipe(
          map((filteredRecords: Record[]) => {
            const start = pageIndex * pageSize;
            const end = pageIndex * pageSize + pageSize;
            return filteredRecords.slice(start, end);
          })
        )
      )
    );
    const subscription = this.records$.subscribe((records) => {
      this.dataSource.data = records || [];
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
