import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VehiclesComponent } from './features/vehicles/vehicles.component';
import { VehicleComponent } from './features/vehicles/vehicle/vehicle.component';
import { FiltersComponent } from './features/filters/filters.component';
import { RecordsComponent } from './features/records/records.component';
import { PaginatorComponent } from './features/paginator/paginator.component';
import { MaterialModule } from './modules/material.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './features/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    VehiclesComponent,
    VehicleComponent,
    FiltersComponent,
    ToolbarComponent,
    RecordsComponent,
    PaginatorComponent,
    MatToolbarModule,
    MaterialModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'vehicles';
  opened = false;
}
