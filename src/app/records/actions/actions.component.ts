import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RecordsService } from '../records.service';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css',
})
export class ActionsComponent {
  @Input({ required: true }) vehicleSerialNumber!: string;
  recordService = inject(RecordsService);

  onEdit() {
    console.log(this.vehicleSerialNumber);
  }

  onDelete() {
    console.log(this.vehicleSerialNumber);
    this.recordService.softRemoveRecord(this.vehicleSerialNumber);
  }
}
