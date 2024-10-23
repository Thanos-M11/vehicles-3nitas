import { Component, inject } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const EDIT_PENCIL_ICON = `
<svg width="30px" height="30px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">

<g id="layer1">

<path d="M 16,0 2,14 1.1054688,16.681641 a 3.5,3.5 0 0 1 2.2109374,2.21289 L 6,18 20,4 Z M 16,1.4140625 18.585938,4 17.767578,4.8183594 15.181641,2.2324219 Z M 14.474609,2.9394531 15.414062,3.8789062 4.25,15.042969 4.9570312,15.75 16.121094,4.5859375 17.060547,5.5253906 5.4589844,17.125 3.7246094,17.703125 C 3.3579209,17.110435 2.8874809,16.640377 2.2949219,16.273438 l 0.578125,-1.734376 z M 0.7890625,17.630859 0,20 2.3691406,19.210938 A 2.5,2.5 0 0 0 0.7890625,17.630859 Z" style="fill:#222222; fill-opacity:1; stroke:none; stroke-width:0px;"/>

</g>

</svg>
`;

@Component({
  selector: 'app-edit-pencil-icon',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './edit-pencil-icon.component.html',
  styleUrl: './edit-pencil-icon.component.css',
})
export class EditPencilIconComponent {
  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    iconRegistry.addSvgIconLiteral(
      'editPencil',
      sanitizer.bypassSecurityTrustHtml(EDIT_PENCIL_ICON)
    );
  }
}
