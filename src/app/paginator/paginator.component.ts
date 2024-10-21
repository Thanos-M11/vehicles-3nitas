import { Component, inject } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AsyncPipe } from '@angular/common';
import { PaginatorService } from '../services/paginator.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule, AsyncPipe],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
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
