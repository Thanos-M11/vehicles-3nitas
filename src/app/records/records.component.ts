import { PaginatorService } from './../services/paginator.service';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RecordsService } from '../services/records.service';
import { FilterService } from '../services/filter.service';
import { Record } from './records.model';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EuroPipe } from './euro.pipe';
import { UnitPipe } from './unit.pipe';
import { RecordDatePipe } from './record-date.pipe';
import { ProgressSpinnerComponent } from '../shared/progress-spinner/progress-spinner.component';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [
    AsyncPipe,
    MatTableModule,
    EuroPipe,
    UnitPipe,
    DecimalPipe,
    RecordDatePipe,
    DatePipe,
    ProgressSpinnerComponent,
  ],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css',
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
