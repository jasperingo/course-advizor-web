import { Component, Input } from '@angular/core';
import { Result } from 'src/app/models/Result';

@Component({
  selector: 'tr[app-result-item]',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css']
})
export class ResultItemComponent {

  @Input() item!: Result;

}
