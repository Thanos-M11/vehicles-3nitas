import { Component, forwardRef, Input } from '@angular/core';

import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MaterialModule } from '../../material/material.module';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input({ required: true }) label!: string;
  @Input() type: string = 'text';

  value: string = '';
  disabled = false;

  private onChange(value: string) {}
  onTouched() {}

  // set the component’s value when the parent form control changes.
  writeValue(value: string): void {
    this.value = value;
  }

  // called whenever the value in the component changes.
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // called whenever the value in the component is touched (blur).
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // called to enable / disable the component
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // captures user input and calls onChange to update the form control's value
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.onChange(this.value);
  }
}
