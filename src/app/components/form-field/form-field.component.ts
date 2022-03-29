import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements OnInit {

  @Input() inputId!: string;

  @Input() labelText!: string;

  @Input() inputType!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
