import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.css']
})
export class FormTextareaComponent {

  @Input() inputId!: string;

  @Input() labelText!: string;

  @Input() parentForm!: FormGroup;

  @Input() controlName!: string;

  @Input() maxLength = '';

  @Input() errors!: Map<string, string>;

  shown = false;

  get control() {
    return this.parentForm.get(this.controlName);
  }

  get error() {
    
    if (this.control && this.control.invalid && (this.control.dirty || this.control.touched)) {

      if (this.control?.errors?.['required']) {
        return 'This field is required';
      }

      if (this.control?.errors?.['maxlength'] || this.control?.errors?.['minlength']) {
        return this.errors.get('maxlength');
      }

      if (this.control?.errors?.['fromServer']) {
        return this.errors.get('fromServer');
      }

    }

    return null;
  }

}
