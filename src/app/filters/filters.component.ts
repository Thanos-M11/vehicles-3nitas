import { Component, DestroyRef, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Filter } from './filter.model';
import { FilterService } from '../services/filter.service';
import { formatDate } from '../helper/helper';
import { DriversService } from '../services/driver.service';
import { DriverState, Vehicle } from '../vehicles/vehicles.model';
import { VehiclesService } from '../services/vehicle.service';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent implements OnInit {
  approvedDropDown = [
    { id: '2', options: 'Ολες' },
    { id: '1', options: 'Εγκεκριμένο' },
    { id: '0', options: 'Ακυρωμένο' },
  ];

  driversDropDown!: DriverState;
  vehicleSelected!: Vehicle;

  constructor(
    private filterService: FilterService,
    private driversService: DriversService,
    private vehicleService: VehiclesService,
    private destroyRef: DestroyRef
  ) {}

  form = new FormGroup({
    serialNumber: new FormControl(),
    driver: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    isApproved: new FormControl(),
  });

  ngOnInit() {
    this.driversDropDown = this.driversService.getDrivers();
    this.vehicleService.selectedVehicle$.subscribe({
      next: (vehicle) => (this.vehicleSelected = vehicle!),
    });
  }

  onSubmit() {
    const newFilter: Filter = {
      serialNumber: this.form.value.serialNumber,
      driverId: +this.form.value.driver,
      startDate:
        this.form.value.startDate && new Date(this.form.value.startDate),
      endDate: this.form.value.endDate && new Date(this.form.value.endDate),
      isApproved: this.form.value.isApproved,
    };

    this.filterService.setFilter(newFilter);
  }

  onClearFilter() {
    this.form.reset();
    this.filterService.clearFilter();
  }
}
