import { Component, DestroyRef, OnInit } from '@angular/core';
import { Vehicle } from '../vehicles/vehicles.model';
import { VehiclesService } from '../services/vehicle.service';
import { VehicleComponent } from '../vehicles/vehicle/vehicle.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit {
  selectedVehicle!: Vehicle | null;

  constructor(
    private vehiclesService: VehiclesService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    const subscription = this.vehiclesService.selectedVehicle$.subscribe({
      next: (vehicle) => (this.selectedVehicle = vehicle),
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
