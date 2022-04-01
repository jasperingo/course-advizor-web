import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-box',
  templateUrl: './error-box.component.html',
  styleUrls: ['./error-box.component.css']
})
export class ErrorBoxComponent implements OnInit {

  @Input() message = '';

  @Input() buttonText = 'Retry';

  @Output() action = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onAction() {
    this.action.emit();
  }

}
