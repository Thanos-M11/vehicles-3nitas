import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleComponent } from './vehicles/vehicle/vehicle.component';
import { FiltersComponent } from './filters/filters.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RecordsComponent } from './records/records.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { MaterialModule } from './material/material.module';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';

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
  opened = true;
}
