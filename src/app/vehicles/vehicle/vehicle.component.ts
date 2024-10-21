import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { VehiclesService } from '../../services/vehicle.service';
import { FilterService } from '../../services/filter.service';
import { Filter } from '../../filters/filter.model';
import { TruckIconComponent } from '../../shared/truck-icon/truck-icon.component';
import { PaginatorService } from '../../services/paginator.service';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [TruckIconComponent],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css',
})
export class VehicleComponent implements OnInit {
  @Input({ required: true }) plate!: string;
  filter!: Filter;

  constructor(
    private vehiclesService: VehiclesService,
    private filterService: FilterService,
    private destroyRef: DestroyRef,
    private paginatorService: PaginatorService
  ) {}

  ngOnInit() {
    const subscription = this.filterService.filter$.subscribe({
      next: (filter) => (this.filter = filter),
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSelectVehicle(selectedPlate: string) {
    this.vehiclesService.setSelectedVehicle(this.plate);
    this.filterService.setFilter({
      ...this.filter,
      plate: selectedPlate,
    });
    this.paginatorService.setPageIndex(0);
  }
}
