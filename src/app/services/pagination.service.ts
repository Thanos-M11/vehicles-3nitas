import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaginationService {
  private startPageSubject = new BehaviorSubject<number>(0);
  private endPageSubject = new BehaviorSubject<number>(100);
  // private batchSizeSubject = new BehaviorSubject<number>(5);

  startPage$ = this.startPageSubject.asObservable();
  endPage$ = this.endPageSubject.asObservable();
  // batchSize$ = this.batchSizeSubject.asObservable();

  setPageSlice(startPage: number, endPage: number): void {
    this.startPageSubject.next(startPage);
    this.endPageSubject.next(endPage);
  }
}
