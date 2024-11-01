import { Component, inject, Input, DestroyRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RecordsService } from '../records.service';
import { MatDialog } from '@angular/material/dialog';
import { RecordFormDialogComponent } from '../record-form-dialog/record-form-dialog.component';
import { Record } from '../records.model';
import { tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { RecordFormDialogService } from '../record-form-dialog/record-form-dialog.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css',
})
export class ActionsComponent {
  @Input({ required: true }) vehicleSerialNumber!: string;
  readonly dialog = inject(MatDialog);
  recordService = inject(RecordsService);
  recordFormDialogService = inject(RecordFormDialogService);
  private destroyRef = inject(DestroyRef);

  openDialog(): void {
    const dialogRef = this.dialog.open(RecordFormDialogComponent, {
      data: { serialNumber: this.vehicleSerialNumber },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (formRawValue: Record | undefined) => {
          // console.log('dialog closed');
          if (formRawValue?.serialNumber) {
            this.recordFormDialogService.addUpdatedRecord(formRawValue);
          }
        },
        error: (error) => console.log(error.message),
      });
  }

  onDelete(): void {
    this.recordService.softRemoveRecord(this.vehicleSerialNumber);
  }
}
