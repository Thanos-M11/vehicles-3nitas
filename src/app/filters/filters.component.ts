import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Filter } from './filter.model';
import { FilterService } from './filter.service';
import { DriversService } from '../drivers/driver.service';
import { VehiclesService } from '../vehicles/vehicle.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Vehicle } from '../vehicles/vehicles.model';
import { combineLatest } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { InputComponent } from '../shared/input/input.component';
import { ApprovedPipe } from '../records/approved.pipe';
import { SelectComponent } from '../shared/select/select.component';
import {
  SelectOptions,
  STATUS_OPTIONS_TOKEN,
  statusOptionsProvider,
} from '../shared/select/select.model';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MaterialModule,
    InputComponent,
    ApprovedPipe,
    SelectComponent,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
  providers: [provideNativeDateAdapter(), statusOptionsProvider],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
  private filterService = inject(FilterService);
  private driversService = inject(DriversService);
  private vehicleService = inject(VehiclesService);
  private destroyRef = inject(DestroyRef);

  public statusOptions = inject(STATUS_OPTIONS_TOKEN);
  public driversDropDown: SelectOptions[] = [];
  public vehicleSelected!: Vehicle;

  constructor() {}

  form = new FormGroup({
    serialNumber: new FormControl(''),
    driver: new FormControl(''),
    dateRange: new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    }),
    isApproved: new FormControl(),
  });

  ngOnInit() {
    const subscription = combineLatest([
      this.vehicleService.selectedVehicle$,
      this.driversService.loadDrivers$(),
    ]).subscribe({
      next: ([vehicle, drivers]) => {
        this.vehicleSelected = vehicle!;
        // updated driversDropdown options
        drivers.forEach((driver) => {
          this.driversDropDown.push({
            value: driver.id,
            label: driver.fullName,
          });
        });
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {
    const newFilter: Filter = {
      serialNumber: this.form.value.serialNumber,
      driverId: this.form.value.driver as string,
      startDate:
        this.form.value.dateRange?.start &&
        new Date(this.form.value.dateRange.start),
      endDate:
        this.form.value.dateRange?.end &&
        new Date(this.form.value.dateRange.end),
      isApproved: this.form.value.isApproved!,
    };

    this.filterService.setFilter(newFilter);
    // console.log(this.form.controls.dateRange.controls);
    // console.log(newFilter);
  }

  onClearFilter() {
    this.form.reset();
    this.filterService.clearFilter();
  }
}
