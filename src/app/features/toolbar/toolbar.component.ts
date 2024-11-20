import { Component, inject, Input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FilterService } from '../../shared/services/filter.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  @Input({ required: true }) sidenavToggle!: () => void;
  filterService = inject(FilterService);
  filter = toSignal(this.filterService.filter$);
}
