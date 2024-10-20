import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleComponent } from './vehicles/vehicle/vehicle.component';
import { FiltersComponent } from './filters/filters.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RecordsComponent } from './records/records.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    VehiclesComponent,
    VehicleComponent,
    FiltersComponent,
    ToolbarComponent,
    PaginationComponent,
    RecordsComponent,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'vehicles';
}
