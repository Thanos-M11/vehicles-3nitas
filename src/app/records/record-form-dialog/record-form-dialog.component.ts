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
import { MaterialModule } from '../../material/material.module';
import { VehicleRecordForm } from './record-form-dialog.model';
import { dateToString, stringToDate } from '../../helper/helper';

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
  formHasChanged = false;

  form = new FormGroup<VehicleRecordForm>({
    serialNumber: new FormControl({ value: null, disabled: true }),
    plate: new FormControl({ value: null, disabled: true }),
    fullName: new FormControl(null),
    issueDate: new FormControl(null),
    isApproved: new FormControl(null),
    tierAmount: new FormControl(null, [
      Validators.min(0.01),
      Validators.max(1),
    ]),
    registrationAmount: new FormControl(null),
    consumptionAmount: new FormControl(null),
    rewardAmount: new FormControl({ value: null, disabled: true }),
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

    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (value) {
          this.formHasChanged = true;
        }
      });
  }

  onSubmit() {
    this.dialogRef.close(this.form.getRawValue());
    console.log(this.form.getRawValue());
  }

  private formPatchValue(record: Record): void {
    this.form.patchValue({
      serialNumber: record.serialNumber,
      plate: record.plate,
      fullName: record.fullName,
      issueDate: stringToDate(record.issueDate as string),
      isApproved: record.isApproved,
      tierAmount: record.tierAmount,
      registrationAmount: record.registrationAmount,
      consumptionAmount: record.consumptionAmount,
      rewardAmount: record.rewardAmount,
    });
  }
}
