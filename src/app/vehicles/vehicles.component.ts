import { Component, DestroyRef, OnInit } from '@angular/core';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleState } from './vehicles.model';
import { VehiclesService } from '../services/vehicle.service';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../services/filter.service';
import { Filter } from '../filters/filter.model';
import { MatListModule } from '@angular/material/list';
import { TruckIconComponent } from '../shared/truck-icon/truck-icon.component';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [VehicleComponent, FormsModule, MatListModule, TruckIconComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css',
})
export class VehiclesComponent implements OnInit {
  vehicles!: VehicleState;
  enteredPlate = '';
  filter!: Filter;

  constructor(
    private vehicleService: VehiclesService,
    private filterService: FilterService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    this.vehicles = this.vehicleService.getVehicles();
    const subscription = this.filterService.filter$.subscribe({
      next: (filter) => (this.filter = filter),
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onBlur() {
    this.vehicleService.setSelectedVehicle(this.enteredPlate);

    this.filterService.setFilter({
      ...this.filter,
      plate: this.enteredPlate,
    });
  }
}
