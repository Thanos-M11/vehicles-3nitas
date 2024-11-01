import { Pipe, PipeTransform } from '@angular/core';
import { stringToDate } from '../helper/helper';

@Pipe({
  name: 'recordIssueDate',
  standalone: true,
})
export class RecordIssueDatePipe implements PipeTransform {
  transform(value: string): Date {
    return stringToDate(value);
  }
}
