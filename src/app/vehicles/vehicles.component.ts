import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleState } from './vehicles.model';
import { VehiclesService } from './vehicle.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterService } from '../filters/filter.service';
import { Filter } from '../filters/filter.model';
import { TruckIconComponent } from '../shared/icons/truck-icon/truck-icon.component';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProgressSpinnerComponent } from '../shared/progress-spinner/progress-spinner.component';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { InputComponent } from '../shared/input/input.component';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    VehicleComponent,
    ReactiveFormsModule,
    MaterialModule,
    TruckIconComponent,
    AsyncPipe,
    ProgressSpinnerComponent,
    RouterLink,
    InputComponent,
  ],
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
