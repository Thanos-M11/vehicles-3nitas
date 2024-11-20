import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Filter } from '../../shared/models/filter.model';
import { FilterService } from '../../shared/services/filter.service';
import { VehiclesService } from '../../shared/services/vehicle.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Vehicle } from '../../shared/models/vehicles.model';
import { combineLatest } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../modules/material.module';
import { InputComponent } from '../../shared/components/input/input.component';
import { SelectComponent } from '../../shared/components/select/select.component';
import {
  SelectOptions,
  STATUS_OPTIONS_TOKEN,
  statusOptionsProvider,
} from '../../shared/models/select.model';
import { DriversService } from '../../shared/services/driver.service';
import { ApprovedPipe } from '../../shared/pipes/approved.pipe';

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
  styleUrl: './filters.component.scss',
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
        this.driversDropDown = [];
        drivers.forEach((driver) => {
          this.driversDropDown.push({
            value: driver.id,
            label: driver.fullName,
          });
        });
        // console.log(this.driversDropDown);
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
