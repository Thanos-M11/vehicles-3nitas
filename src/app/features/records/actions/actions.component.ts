import { Component, inject, Input, DestroyRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { RecordFormDialogComponent } from '../record-form-dialog/record-form-dialog.component';
import { Record } from '../../../shared/models/records.model';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RecordFormDialogService } from '../../../shared/services/record-form-dialog.service';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss',
})
export class ActionsComponent {
  @Input({ required: true }) vehicleSerialNumber!: string;
  readonly dialog = inject(MatDialog);
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
    this.recordFormDialogService.softRemoveRecord(this.vehicleSerialNumber);
  }
}
