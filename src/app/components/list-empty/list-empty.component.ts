import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-empty',
  templateUrl: './list-empty.component.html',
  styleUrls: ['./list-empty.component.css']
})
export class ListEmptyComponent {

  @Input() text = '';
  
}
