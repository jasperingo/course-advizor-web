import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-message',
  templateUrl: './form-message.component.html',
  styleUrls: ['./form-message.component.css']
})
export class FormMessageComponent {

  @Input() error: string | null = null;

  @Input() success: string | null = null;

}
