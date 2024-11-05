import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unit',
  standalone: true,
})
export class UnitPipe implements PipeTransform {
  transform(value: number, unit: string = ''): string {
    return `${value.toFixed(2)} ${unit}`;
  }
}
