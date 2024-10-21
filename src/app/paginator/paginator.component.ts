import { Component, inject, Injectable, OnInit } from '@angular/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { AsyncPipe } from '@angular/common';
import { PaginatorService } from '../services/paginator.service';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = `Πρώτη σελίδα`;
  itemsPerPageLabel = `Καταχωρήσεις ανά σελίδα:`;
  lastPageLabel = `Τελευταία σελίδα`;
  nextPageLabel = `Επόμενη σελίδα`;
  previousPageLabel = `Προηγούμενη σελίδα`;

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Σελίδα 1 από 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `${page * pageSize + 1} - ${
      page * pageSize + pageSize
    } από ${length}`;
  }
}

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule, AsyncPipe],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginatorIntl,
    },
  ],
})
export class PaginatorComponent implements OnInit {
  paginatorService = inject(PaginatorService);
  length$!: Observable<number>;
  pageSize$!: Observable<number>;
  pageIndex$!: Observable<number>;
  pageSizeOptions!: number[];

  ngOnInit() {
    this.length$ = this.paginatorService.length$;
    this.pageSize$ = this.paginatorService.pageSize$;
    this.pageIndex$ = this.paginatorService.pageIndex$;
    this.pageSizeOptions = this.paginatorService.pageSizeOptions;
  }

  handlePageEvent(e: PageEvent) {
    this.paginatorService.setPageIndex(e.pageIndex);
    this.paginatorService.setPageSize(e.pageSize);
  }
}
