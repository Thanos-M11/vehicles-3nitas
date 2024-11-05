import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DriversService } from '../../shared/services/driver.service';
import { Driver } from '../../shared/models/drivers.model';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css',
})
export class DriversComponent implements OnInit {
  // private destroyRef = inject(DestroyRef);
  // driverService = inject(DriversService);
  // isFetchingSubject = new BehaviorSubject<boolean>(false);
  // errorSubject = new BehaviorSubject<string>('');

  // isFetching$ = this.isFetchingSubject.asObservable();
  // error$ = this.errorSubject.asObservable();
  // drivers: Driver[] = [];

  ngOnInit() {
  //   this.isFetchingSubject.next(true);
  //   const subscription = this.driverService.loadDrivers$().subscribe({
  //     next: (drivers) => {
  //       this.drivers = drivers;
  //     },
  //     error: (error: Error) => {
  //       this.errorSubject.next(error.message);
  //     },
  //     complete: () => {
  //       this.isFetchingSubject.next(false);
  //     },
  //   });

  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
