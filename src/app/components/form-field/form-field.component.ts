import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements OnInit {

  @Input() inputId!: string;

  @Input() labelText!: string;

  @Input() inputType = 'text';

  @Input() parentForm!: FormGroup;

  @Input() controlName!: string;

  @Input() maxLength = '';

  @Input() lengthError = '';

  constructor() { }

  ngOnInit(): void {
  }

  get control() {
    return this.parentForm.get(this.controlName);
  }

  get error() {
    
    if (this.control && this.control.invalid && (this.control.dirty || this.control.touched)) {

      if (this.control?.errors?.['required']) {
        return 'This field is required';
      }

      if (this.control?.errors?.['maxlength'] || this.control?.errors?.['minlength']) {
        return this.lengthError;
      }

    }

    return null;
  }

}
