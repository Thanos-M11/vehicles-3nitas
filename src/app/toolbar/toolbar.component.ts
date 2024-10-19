import { Component, DestroyRef, OnInit } from '@angular/core';
import { Vehicle } from '../vehicles/vehicles.model';
import { VehiclesService } from '../services/vehicle.service';
import { VehicleComponent } from '../vehicles/vehicle/vehicle.component';
import { Observable } from 'rxjs';
import { FilterService } from '../services/filter.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit {
  selectedVehicle!: Vehicle | null;
  filterIsActive$!: Observable<boolean>;

  constructor(
    private vehiclesService: VehiclesService,
    private destroyRef: DestroyRef,
    private filterService: FilterService
  ) {
    this.filterIsActive$ = this.filterService.filterIsActive$;
  }

  ngOnInit() {
    const subscription = this.vehiclesService.selectedVehicle$.subscribe({
      next: (vehicle) => (this.selectedVehicle = vehicle),
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
