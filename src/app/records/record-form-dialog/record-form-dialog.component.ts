import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { RecordsService } from '../records.service';
import { RecordIssueDatePipe } from '../record-issue-date.pipe';
import { DatePipe } from '@angular/common';
import { Record } from '../records.model';
import { DriversService } from '../../drivers/driver.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Driver } from '../../drivers/drivers.model';
import { ApprovedPipe } from '../approved.pipe';
import { provideNativeDateAdapter } from '@angular/material/core';
import { formatIssueDate } from '../../helper/helper';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-record-form-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    MatDialogModule,
    RecordIssueDatePipe,
    DatePipe,
    ApprovedPipe,
  ],
  templateUrl: './record-form-dialog.component.html',
  styleUrl: './record-form-dialog.component.css',
  providers: [provideNativeDateAdapter()],
})
export class RecordFormDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<RecordFormDialogComponent>);
  readonly data = inject<{ serialNumber: string }>(MAT_DIALOG_DATA);
  private recordsService = inject(RecordsService);
  private destroyRef = inject(DestroyRef);

  driversService = inject(DriversService);
  drivers = toSignal<Driver[]>(this.driversService.loadDrivers$());
  statusOptions = [true, false];

  form = new FormGroup({
    serialNumber: new FormControl({ value: '', disabled: true }),
    plate: new FormControl({ value: '', disabled: true }),
    fullName: new FormControl(''),
    issueDate: new FormControl(''),
    isApproved: new FormControl(),
    tierAmount: new FormControl(0, [Validators.min(0.01), Validators.max(1)]),
    registrationAmount: new FormControl(0),
    consumptionAmount: new FormControl(0),
    rewardAmount: new FormControl({ value: 0, disabled: true }),
  });

  ngOnInit() {
    this.recordsService
      .getRecordBySerialNumber$(this.data.serialNumber)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (record) => {
          if (record) {
            this.formPatchValue(record);
          }
        },
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private formPatchValue(record: Record): void {
    this.form.patchValue({
      serialNumber: record.serialNumber,
      plate: record.plate,
      fullName: record.fullName,
      issueDate: record.issueDate,
      isApproved: record.isApproved,
      tierAmount: +record.tierAmount,
      registrationAmount: +record.registrationAmount,
      consumptionAmount: +record.consumptionAmount,
      rewardAmount: +record.rewardAmount,
    });
  }
}
