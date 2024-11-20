import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unit',
})
export class UnitPipe implements PipeTransform {
  transform(value: number, unit: string = ''): string {
    return `${value.toFixed(2)} ${unit}`;
  }
}
