import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleState } from './vehicles.model';
import { VehiclesService } from '../services/vehicle.service';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../services/filter.service';
import { Filter } from '../filters/filter.model';
import { MatListModule } from '@angular/material/list';
import { TruckIconComponent } from '../shared/truck-icon/truck-icon.component';
import { MagnifierIconComponent } from '../shared/magnifier-icon/magnifier-icon.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    VehicleComponent,
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    TruckIconComponent,
    MagnifierIconComponent,
    AsyncPipe,
  ],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css',
})
export class VehiclesComponent implements OnInit {
  private vehiclesService = inject(VehiclesService);
  private filterService = inject(FilterService);
  private destroyRef = inject(DestroyRef);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  public vehicles!: VehicleState;
  public enteredPlate = '';
  public filter!: Filter;
  public isLoading$ = this.isLoadingSubject.asObservable();

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

  handleEnteredPlate() {
    this.vehiclesService.setSelectedVehicle(this.enteredPlate);

    this.filterService.setFilter({
      ...this.filter,
      plate: this.enteredPlate,
    });
    this.enteredPlate = '';
  }
}
