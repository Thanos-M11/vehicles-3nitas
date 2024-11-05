import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApprovedPipe } from '../approved.pipe';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MaterialModule } from '../../material/material.module';
import { VehicleRecordForm } from './record-form-dialog.model';
import { stringToDate } from '../../helper/helper';
import { InputComponent } from '../../shared/input/input.component';
import { SelectComponent } from '../../shared/select/select.component';
import { SelectOptions } from '../../shared/select/select.model';

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
    InputComponent,
    SelectComponent,
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
  driversDropDown: SelectOptions[] = [];
  statusOptions: SelectOptions[] = [
    {
      value: true,
      label: 'Εγκεκριμένο',
    },
    {
      value: false,
      label: 'Ακυρωμένο',
    },
  ];
  form!: FormGroup<VehicleRecordForm>;

  constructor() {
    this.form = this.buildForm();
  }

  ngOnInit() {
    this.subscribeToDrivers();
    this.subscribeToRecordsService();
  }

  get issueDateIsInvalid() {
    return (
      this.form.controls.issueDate.touched &&
      this.form.controls.issueDate.dirty &&
      this.form.controls.issueDate.invalid
    );
  }

  get tierAmountIsInvalid(): boolean {
    return (
      this.form.controls.tierAmount.touched &&
      this.form.controls.tierAmount.dirty &&
      this.form.controls.tierAmount.invalid
    );
  }

  get registrationAmountIsInvalid() {
    return (
      this.form.controls.registrationAmount.touched &&
      this.form.controls.registrationAmount.dirty &&
      this.form.controls.registrationAmount.invalid
    );
  }

  get consumptionAmountIsInvalid() {
    return (
      this.form.controls.consumptionAmount.touched &&
      this.form.controls.consumptionAmount.dirty &&
      this.form.controls.consumptionAmount.invalid
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue());
    }
    console.log(this.form.getRawValue());
  }

  private subscribeToDrivers(): void {
    this.driversService
      .loadDrivers$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (drivers) =>
          drivers.forEach((driver) =>
            this.driversDropDown.push({
              value: driver.fullName,
              label: driver.fullName,
            })
          ),
      });
  }

  private subscribeToRecordsService(): void {
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

  private buildForm(): FormGroup {
    const form = new FormGroup<VehicleRecordForm>({
      serialNumber: new FormControl({ value: null, disabled: true }),
      plate: new FormControl({ value: null, disabled: true }),
      fullName: new FormControl(null, { validators: [Validators.required] }),
      issueDate: new FormControl(null, { validators: [Validators.required] }),
      isApproved: new FormControl(null, { validators: [Validators.required] }),
      tierAmount: new FormControl(null, {
        validators: [
          Validators.min(0.01),
          Validators.max(1.0),
          Validators.required,
        ],
        updateOn: 'change',
      }),
      registrationAmount: new FormControl(null, {
        validators: [Validators.required, Validators.min(0.01)],
      }),
      consumptionAmount: new FormControl(null, {
        validators: [Validators.required, Validators.min(0.01)],
      }),
      rewardAmount: new FormControl({ value: null, disabled: true }),
    });

    return form;
  }
}
