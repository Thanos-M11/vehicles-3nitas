import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'euro',
})
export class EuroPipe implements PipeTransform {
  transform(value: number, symbol: string = '€'): string {
    return `${value.toFixed(2)} ${symbol}`;
  }
}
