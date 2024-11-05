import { InjectionToken, Provider } from '@angular/core';

export interface SelectOptions {
  value: any;
  label: string;
}

export const STATUS_OPTIONS_TOKEN = new InjectionToken<SelectOptions[]>(
  'status-options-token'
);

export const StatusOptions: SelectOptions[] = [
  { value: true, label: 'Εγκεκριμένο' },
  { value: false, label: 'Ακυρωμένο' },
];

export const statusOptionsProvider: Provider = {
  provide: STATUS_OPTIONS_TOKEN,
  useValue: StatusOptions,
};
