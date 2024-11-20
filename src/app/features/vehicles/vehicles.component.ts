import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { VehicleState } from '../../shared/models/vehicles.model';
import { VehiclesService } from '../../shared/services/vehicle.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterService } from '../../shared/services/filter.service';
import { Filter } from '../../shared/models/filter.model';

import { BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css',
})
export class VehiclesComponent implements OnInit {
  private vehiclesService = inject(VehiclesService);
  private filterService = inject(FilterService);
  private destroyRef = inject(DestroyRef);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  public truckIconClass: string = 'green';
  public vehicles!: VehicleState;
  // public enteredPlate = '';
  public filter!: Filter;
  public isLoading$ = this.isLoadingSubject.asObservable();

  form = new FormGroup({
    enteredPlate: new FormControl(''),
  });

  constructor() {}

  ngOnInit() {
    this.isLoadingSubject.next(true);
    const subscription = combineLatest([
      this.filterService.filter$,
      this.vehiclesService.loadVehicles$(),
    ]).subscribe({
      next: ([filter, vehicles]) => {
        this.filter = filter;
        this.vehicles = vehicles;
        this.isLoadingSubject.next(false);
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {
    this.vehiclesService.setSelectedVehicle(
      this.form.value.enteredPlate as string
    );

    this.filterService.setFilter({
      ...this.filter,
      plate: this.form.value.enteredPlate as string,
    });
    this.form.reset();
  }

  onCancel() {
    this.vehiclesService.setSelectedVehicle('');
    this.filterService.setFilter({
      ...this.filter,
      plate: '',
    });
    this.form.reset();
  }
}
