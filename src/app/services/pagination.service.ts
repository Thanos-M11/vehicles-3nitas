import { SharedPaginationService } from './shared-pagination.service';
import { DestroyRef, Injectable, Pipe } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PaginationService {
  readonly batchSizes = [5, 10, 20, 30, 50];

  private totalPagesSubject = new BehaviorSubject<number>(0);
  private batchSizeSubject = new BehaviorSubject<number>(this.batchSizes[0]);
  private currentBatchSubject = new BehaviorSubject<number>(1);

  public totalPages$ = this.totalPagesSubject.asObservable();
  public batchSize$ = this.batchSizeSubject.asObservable();
  public currentBatch$ = this.currentBatchSubject.asObservable();

  // dereived observables
  public totalBatches$!: Observable<number>;

  constructor(
    private sharedPaginationService: SharedPaginationService,
    private destroyRef: DestroyRef
  ) {
    this.totalBatches$ = this.getDirevedTotalBatches$();

    const subscription = this.subscribeTotalPages();
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  setBatchSize(value: number): void {
    this.batchSizeSubject.next(value);
  }

  setCurrentBatch(value: number): void {
    this.currentBatchSubject.next(value);
  }

  nextBatch(): void {
    const currentBatch: number = this.currentBatchSubject.getValue();
    this.currentBatchSubject.next(currentBatch + 1);
  }

  previousBatch(): void {
    const currentBatch: number = this.currentBatchSubject.getValue();
    this.currentBatchSubject.next(currentBatch - 1);
  }

  private getDirevedTotalBatches$(): Observable<number> {
    return combineLatest([this.totalPages$, this.batchSize$]).pipe(
      map(([totalPages, batchSize]) => {
        return batchSize > 0 ? Math.ceil(totalPages / batchSize) : 0;
      })
    );
  }

  // subscriptions
  private subscribeTotalPages() {
    const subscription = this.sharedPaginationService.totalPages$.subscribe({
      next: (totalPages) => this.totalPagesSubject.next(totalPages),
    });
    return subscription;
  }
}
