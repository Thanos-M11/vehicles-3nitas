import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'approved',
})
export class ApprovedPipe implements PipeTransform {
  transform(value: boolean): string {
    const options: { [key: string]: string } = {
      true: 'Εγκεκριμένο',
      false: 'Ακυρωμένο',
    };

    return options[value.toString()];
  }
}
