import { Component, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaginationService } from '../services/pagination.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  batchSizes = [5, 10, 20, 30, 50]; // number of items per rendered page
  batchSize!: number;
  totalPages = 85;
  currentBatch = 1;
  startPage!: number;
  endPage!: number;

  totalBatches = Math.ceil(this.totalPages / this.batchSize);

  form = new FormGroup({
    batchSize: new FormControl(this.batchSizes[0]),
  });

  constructor() // private paginationService: PaginationService,
  // private destroyRef: DestroyRef
  {}

  ngOnInit() {
    // this.paginationService.startPage$.subscribe({
    //   next: (start) => (this.startPage = start),
    // }),
    //   this.paginationService.endPage$.subscribe({
    //     next: (end) => (this.endPage = end),
    //   }),

    //
    this.batchSize = this.form.value.batchSize!;
    this.calcPageSlice();
  }

  onSetBatchSize() {
    this.batchSize = this.form.value.batchSize!;
  }

  onStart() {
    this.currentBatch = 1;
    this.calcPageSlice();
  }

  onEnd() {
    this.currentBatch = this.totalBatches;
    this.calcPageSlice();
  }

  onNext() {
    if (this.currentBatch < this.totalBatches) {
      this.currentBatch++;
      this.calcPageSlice();
    } else {
      this.currentBatch = 1;
      this.calcPageSlice();
    }
  }

  onPrevious() {
    if (this.currentBatch > 1) {
      this.currentBatch--;
      this.calcPageSlice();
    } else {
      this.currentBatch = this.totalBatches;
      this.calcPageSlice();
    }
  }

  private calcPageSlice() {
    this.startPage = this.batchSize * this.currentBatch - this.batchSize + 1;
    this.endPage = this.batchSize * this.currentBatch;
    this.totalBatches = Math.ceil(this.totalPages / this.batchSize);
    // this.paginationService.setPageSlice(this.startPage - 1, this.endPage);
  }
}
