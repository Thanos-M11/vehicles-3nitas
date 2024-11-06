import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedPaginationService {
  private lengthSubject = new BehaviorSubject<number>(0);
  public length$ = this.lengthSubject.asObservable();

  setLength(length: number): void {
    this.lengthSubject.next(length);
  }
}
