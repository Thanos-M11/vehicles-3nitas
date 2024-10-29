import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Vehicle } from '../vehicles/vehicles.model';
import { VehiclesService } from '../vehicles/vehicle.service';
import { Observable } from 'rxjs';
import { FilterService } from '../filters/filter.service';
import { AsyncPipe } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [AsyncPipe, MatToolbar],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit {
  selectedPlate!: string | null;
  filterService = inject(FilterService);
  filter = toSignal(this.filterService.filter$);

  constructor() {}

  ngOnInit() {}
}
