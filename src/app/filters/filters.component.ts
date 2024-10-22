import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Filter } from './filter.model';
import { FilterService } from '../services/filter.service';
import { DriversService } from '../services/driver.service';
import { VehiclesService } from '../services/vehicle.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Driver, DriverState } from '../drivers/drivers.model';
import { Vehicle } from '../vehicles/vehicles.model';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInput,
    MatDatepickerModule,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
  private filterService = inject(FilterService);
  private driversService = inject(DriversService);
  private vehicleService = inject(VehiclesService);
  private destroyRef = inject(DestroyRef);

  approvedDropDown = [
    { id: '2', options: 'Ολες' },
    { id: '1', options: 'Εγκεκριμένο' },
    { id: '0', options: 'Ακυρωμένο' },
  ];

  public driversDropDown!: DriverState;
  public vehicleSelected!: Vehicle;

  constructor() {}

  form = new FormGroup({
    serialNumber: new FormControl(),
    driver: new FormControl(''),
    dateRange: new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    }),
    isApproved: new FormControl(''),
  });

  ngOnInit() {
    const subscription = combineLatest([
      this.vehicleService.selectedVehicle$,
      this.driversService.loadDrivers$(),
    ]).subscribe({
      next: ([vehicle, drivers]) => {
        this.vehicleSelected = vehicle!;
        this.driversDropDown = drivers;
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {
    const newFilter: Filter = {
      serialNumber: this.form.value.serialNumber,
      driverId: +this.form.value.driver!,
      startDate:
        this.form.value.dateRange?.start &&
        new Date(this.form.value.dateRange.start),
      endDate:
        this.form.value.dateRange?.end &&
        new Date(this.form.value.dateRange.end),
      isApproved: this.form.value.isApproved!,
    };

    this.filterService.setFilter(newFilter);
    console.log(this.form.controls.dateRange.controls);
  }

  onClearFilter() {
    this.form.reset();
    this.filterService.clearFilter();
  }
}
