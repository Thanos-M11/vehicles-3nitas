import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RecordsService } from '../records.service';
import { RecordIssueDatePipe } from '../record-issue-date.pipe';
import { DatePipe } from '@angular/common';
import { Record } from '../records.model';
import { MatSelectModule } from '@angular/material/select';
import { DriversService } from '../../drivers/driver.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Driver } from '../../drivers/drivers.model';
import { ApprovedPipe } from '../approved.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { formatIssueDate } from '../../helper/helper';

@Component({
  selector: 'app-record-form-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    RecordIssueDatePipe,
    DatePipe,
    ApprovedPipe,
    MatDatepickerModule,
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
    fullName: new FormControl(),
    issueDate: new FormControl(),
    isApproved: new FormControl(),
    tierAmount: new FormControl(0, [Validators.min(0.01), Validators.max(1)]),
    registrationAmount: new FormControl(),
    consumptionAmount: new FormControl(),
  });
  vehicleRecord!: Record | null;

  ngOnInit() {
    const subscription = this.recordsService
      .getRecordBySerialNumber$(this.data.serialNumber)
      .subscribe({
        next: (record) => {
          if (record) {
            this.vehicleRecord = record;
            this.form.patchValue({
              fullName: record.fullName,
              issueDate: formatIssueDate(record.issueDate),
              isApproved: record.isApproved,
              tierAmount: record.tierAmount,
              registrationAmount: record.registrationAmount,
              consumptionAmount: record.consumptionAmount,
            });
          }
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
