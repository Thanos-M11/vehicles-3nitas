import { Component, inject, OnInit } from '@angular/core';
import { FilterService } from '../filters/filter.service';
import { MatToolbar } from '@angular/material/toolbar';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbar],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  filterService = inject(FilterService);
  filter = toSignal(this.filterService.filter$);
}
