import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RecordsService } from '../services/records.service';
import { FilterService } from '../services/filter.service';
import { RecordComponent } from './record/record.component';
import { RecordState } from './records.model';
import { VehiclesService } from '../services/vehicle.service';
import { Vehicle } from '../vehicles/vehicles.model';
import { PaginationService } from '../services/pagination.service';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [RecordComponent],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css',
})
export class RecordsComponent implements OnInit {
  private recordsService = inject(RecordsService);
  private filterService = inject(FilterService);
  private vehiclesService = inject(VehiclesService);
  private destroyRef = inject(DestroyRef);

  private startPage!: number;
  private endPage!: number;

  vehicleSelected!: Vehicle | null;

  records!: RecordState;
  tableHeadings!: string[];

  constructor(private paginationService: PaginationService) {}

  ngOnInit() {
    this.tableHeadings = [
      'Σειρά Αριθμός',
      'Οδηγός',
      'Ημερομηνία',
      'Κατάσταση',
      'Κλίμακα επιβράβευσης',
      'Ποσό καταχώρησης',
      'Ποσότητα κατανάλωσης',
      'Ποσό επιβράβευσης',
    ];

    const subscriptions = {
      startPage: this.paginationService.startPage$.subscribe({
        next: (start) => (this.startPage = start),
      }),
      endPage: this.paginationService.endPage$.subscribe({
        next: (end) => (this.endPage = end),
      }),
      filter: this.filterService.filter$.subscribe({
        next: (filter) => {
          const filteredRecords =
            this.recordsService.getFilteredRecords(filter);
          this.records = filteredRecords.slice(this.startPage, this.endPage);
        },
      }),
      vehicle: this.vehiclesService.selectedVehicle$.subscribe({
        next: (vehicle) => (this.vehicleSelected = vehicle),
      }),
    };

    this.destroyRef.onDestroy(() =>
      Object.values(subscriptions).forEach((sub) => sub.unsubscribe())
    );
  }
}
