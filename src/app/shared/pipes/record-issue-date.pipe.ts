import { Pipe, PipeTransform } from '@angular/core';
import { stringToDate } from '../helper/helper';

@Pipe({
  name: 'recordIssueDate',
})
export class RecordIssueDatePipe implements PipeTransform {
  transform(value: string): Date {
    return stringToDate(value);
  }
}
