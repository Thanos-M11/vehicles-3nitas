import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RecordsService } from '../records.service';
import { MatDialog } from '@angular/material/dialog';
import { RecordFormDialogComponent } from '../record-form-dialog/record-form-dialog.component';
import { Record } from '../records.model';
import { tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

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
  resultData!: Record | null;

  openDialog(): void {
    // console.log(this.vehicleSerialNumber)
    const dialogRef = this.dialog.open(RecordFormDialogComponent, {
      data: { serialNumber: this.vehicleSerialNumber },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('dialog closed');
      if (result !== undefined) {
        this.resultData = result;
      }
      console.log(this.resultData);
    });
  }

  onDelete(): void {
    this.recordService.softRemoveRecord(this.vehicleSerialNumber);
  }
}
