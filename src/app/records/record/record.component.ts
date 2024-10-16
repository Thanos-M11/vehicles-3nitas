import { Component, Input } from '@angular/core';
import { Record } from '../records.model';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { EuroPipe } from './euro.pipe';
import { UnitPipe } from './unit.pipe';
import { formatDate } from '../../helper/helper';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [DatePipe, DecimalPipe, CurrencyPipe, EuroPipe, UnitPipe],
  templateUrl: './record.component.html',
  styleUrl: './record.component.css',
})
export class RecordComponent {
  @Input({ required: true }) record!: Record;
  formatedIssueDate!: Date;

  ngOnInit() {
    this.formatedIssueDate = formatDate(this.record.issueDate);
  }
}
