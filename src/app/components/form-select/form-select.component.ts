import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

export type FormSelectOptionsType = { value: string; text: string }[];

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.css']
})
export class FormSelectComponent {

  @Input() inputId!: string;

  @Input() labelText!: string;

  @Input() parentForm!: FormGroup;

  @Input() controlName!: string;

  @Input() options: FormSelectOptionsType = [];

  @Input() serverError = '';

  get control() {
    return this.parentForm.get(this.controlName);
  }

  get error() {
    
    if (this.control && this.control.invalid && (this.control.dirty || this.control.touched)) {

      if (this.control?.errors?.['required']) {
        return 'This field is required';
      }

      if (this.control?.errors?.['fromServer']) {
        return this.serverError;
      }

    }

    return null;
  }
}
