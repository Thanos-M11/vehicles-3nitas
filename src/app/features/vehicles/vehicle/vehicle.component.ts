import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { VehiclesService } from '../../../shared/services/vehicle.service';
import { FilterService } from '../../../shared/services/filter.service';
import { Filter } from '../../../shared/models/filter.model';
import { PaginatorService } from '../../../shared/services/paginator.service';

@Component({
  selector: 'app-vehicle',
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
