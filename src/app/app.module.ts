import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { VehiclesComponent } from './features/vehicles/vehicles.component';
import { VehicleComponent } from './features/vehicles/vehicle/vehicle.component';
import { FiltersComponent } from './features/filters/filters.component';
import { ToolbarComponent } from './features/toolbar/toolbar.component';
import { RecordsComponent } from './features/records/records.component';
import { PaginatorComponent } from './features/paginator/paginator.component';
import {
  provideRouter,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  withComponentInputBinding,
} from '@angular/router';
import { MaterialModule } from './modules/material.module';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruckIconComponent } from './shared/icons/truck-icon/truck-icon.component';
import { ProgressSpinnerComponent } from './shared/components/progress-spinner/progress-spinner.component';
import { InputComponent } from './shared/components/input/input.component';
import { ThreeDotsIconComponent } from './shared/icons/three-dots-icon/three-dots-icon.component';
import { ApprovedPipe } from './shared/pipes/approved.pipe';
import { SelectComponent } from './shared/components/select/select.component';
import { ActionsComponent } from './features/records/actions/actions.component';
import { RecordIssueDatePipe } from './shared/pipes/record-issue-date.pipe';
import { UnitPipe } from './shared/pipes/unit.pipe';
import { EuroPipe } from './shared/pipes/euro.pipe';
import { CommonModule } from '@angular/common';
import { RecordFormDialogComponent } from './features/records/record-form-dialog/record-form-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ActionsComponent,
    VehiclesComponent,
    VehicleComponent,
    FiltersComponent,
    ToolbarComponent,
    RecordsComponent,
    RecordFormDialogComponent,
    PaginatorComponent,
    ThreeDotsIconComponent,
    TruckIconComponent,
    ProgressSpinnerComponent,
    InputComponent,
    SelectComponent,
    ApprovedPipe,
    EuroPipe,
    UnitPipe,
    RecordIssueDatePipe,
  ],

  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    RouterLinkActive,
    RouterLink,
    RouterOutlet,
    CommonModule,
  ],
  exports: [MaterialModule],
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
