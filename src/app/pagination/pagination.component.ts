import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { PaginationService } from '../services/pagination.service';
import { combineLatest } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, NgIf],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit {
  paginationService = inject(PaginationService);
  batchSizes!: number[];
  currentBatch!: number;
  totalBatches!: number;
  batchSize!: number;
  totalPages$ = this.paginationService.totalPages$;

  form!: FormGroup;

  constructor(private fb: FormBuilder, private destroyRef: DestroyRef) {
    this.form = this.fb.group({
      batchSize: new FormControl(5),
    });
  }

  ngOnInit() {
    this.batchSizes = this.paginationService.batchSizes;
    const subscription = combineLatest([
      this.paginationService.currentBatch$,
      this.paginationService.batchSize$,
      this.paginationService.totalBatches$,
    ]).subscribe(([currentBatch, batchSize, totalBatches]) => {
      this.currentBatch = currentBatch;
      this.batchSize = batchSize;
      this.totalBatches = totalBatches;
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSetBatchSize() {
    this.paginationService.setBatchSize(+this.form.value.batchSize);
  }

  onStart(): void {
    this.paginationService.setCurrentBatch(1);
  }

  onEnd(): void {
    this.paginationService.setCurrentBatch(this.totalBatches);
  }

  onNext(): void {
    if (this.currentBatch < this.totalBatches) {
      this.paginationService.nextBatch();
    } else {
      this.paginationService.setCurrentBatch(1);
    }
  }

  onPrevious(): void {
    if (this.currentBatch > 1) {
      this.paginationService.previousBatch();
    } else {
      this.paginationService.setCurrentBatch(this.totalBatches);
    }
  }
}
