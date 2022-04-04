import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.css']
})
export class FormButtonComponent {

  @Input() loading = false;

  @Input() label = 'Submit';

  @Input() danger = false;

  get color() {
    return {
      'bg-blue-500': !this.danger,
      'hover:bg-blue-400': !this.danger,
      'bg-red-500': this.danger,
      'hover:bg-red-400': this.danger,
    }
  }

}
