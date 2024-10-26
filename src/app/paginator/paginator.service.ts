import { DestroyRef, Injectable } from '@angular/core';
import { SharedPaginationService } from './shared-pagination.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaginatorService {
  readonly pageSizeOptions = [5, 10, 25, 50];
  private lengthSubject = new BehaviorSubject<number>(50);
  private pageIndexSubject = new BehaviorSubject<number>(0);
  private pageSizeSubject = new BehaviorSubject<number>(5);

  public length$ = this.lengthSubject.asObservable();
  public pageIndex$ = this.pageIndexSubject.asObservable();
  public pageSize$ = this.pageSizeSubject.asObservable();

  constructor(
    private sharedPaginationService: SharedPaginationService,
    private destroyRef: DestroyRef
  ) {
    const subscription = this.subscribeToLength();
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  setPageIndex(pageIndex: number) {
    this.pageIndexSubject.next(pageIndex);
  }

  setPageSize(pageSize: number) {
    this.pageSizeSubject.next(pageSize);
  }

  private subscribeToLength() {
    const subscription = this.sharedPaginationService.length$.subscribe({
      next: (length) => this.lengthSubject.next(length),
    });
    return subscription;
  }
}
