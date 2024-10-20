import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '../helper/helper';

@Pipe({
  name: 'recordDate',
  standalone: true,
})
export class RecordDatePipe implements PipeTransform {
  transform(value: string): Date {
    return formatDate(value);
  }
}
