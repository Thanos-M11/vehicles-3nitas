import { Component, inject } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const TRUCK_ICON = `
<svg height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 491.928 491.928" xml:space="preserve">
<path d="M488.56,226.977l-83.433-83.433c-2.157-2.156-5.082-3.368-8.132-3.368H337.13V96.312c0-11.544-9.982-21.297-21.797-21.297
	L21.297,75.015C9.554,75.015,0,84.568,0,96.312v243.949c0,11.744,9.554,21.298,21.297,21.298h34.987
	c5.263,31.369,32.593,55.354,65.434,55.354s60.171-23.984,65.434-55.354h152.27c5.263,31.369,32.593,55.354,65.434,55.354
	c32.847,0,60.182-23.992,65.437-55.371c0.113,0.004,0.223,0.018,0.337,0.018c11.744,0,21.297-9.554,21.297-21.297V235.108
	C491.928,232.059,490.716,229.134,488.56,226.977z M392.231,163.176l62.716,62.716H337.13v-62.716H392.231z M56.459,338.56H23
	V98.015l291.13,0.001V338.56H186.977c-5.662-30.888-32.76-54.375-65.259-54.375C89.22,284.185,62.121,307.672,56.459,338.56z
	 M121.718,393.913c-23.911,0-43.364-19.453-43.364-43.364c0-23.911,19.453-43.364,43.364-43.364
	c23.911,0,43.364,19.453,43.364,43.364C165.083,374.46,145.629,393.913,121.718,393.913z M404.856,393.913
	c-23.911,0-43.364-19.453-43.364-43.364c0-23.911,19.453-43.364,43.364-43.364c23.911,0,43.364,19.453,43.364,43.364
	C448.221,374.46,428.767,393.913,404.856,393.913z M404.856,284.185c-32.499,0-59.597,23.487-65.259,54.375h-2.468v-89.668h131.798
	v84.389C461.307,305.035,435.477,284.185,404.856,284.185z"/>
</svg>
`;

@Component({
  selector: 'app-truck-icon',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './truck-icon.component.html',
  styleUrl: './truck-icon.component.css',
})
export class TruckIconComponent {
  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    iconRegistry.addSvgIconLiteral(
      'truck',
      sanitizer.bypassSecurityTrustHtml(TRUCK_ICON)
    );
  }
}
