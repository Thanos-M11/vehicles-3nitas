import { Component, inject, Input, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterService } from '../../shared/services/filter.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbar, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  @Input({ required: true }) sidenavToggle!: () => void;
  filterService = inject(FilterService);
  filter = toSignal(this.filterService.filter$);
}
