import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.css']
})
export class FormSelectComponent implements OnInit {

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

    }

    return null;
  }
}
