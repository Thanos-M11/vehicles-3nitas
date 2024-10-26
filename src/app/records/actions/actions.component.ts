import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css',
})
export class ActionsComponent {
  @Input({ required: true }) vehicleId!: string;

  onEdit() {
    console.log(this.vehicleId);
  }

  onDelete() {
    console.log(this.vehicleId);
  }
}
