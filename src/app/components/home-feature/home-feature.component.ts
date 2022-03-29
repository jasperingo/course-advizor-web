import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'li[app-home-feature]',
  templateUrl: './home-feature.component.html',
  styleUrls: ['./home-feature.component.css']
})
export class HomeFeatureComponent implements OnInit {

  @Input() text!: string;

  @Input() photo!: string;

  constructor() { }

  ngOnInit(): void {
  }

  getPhoto(): string {
    return `/assets/images/${this.photo}`;
  }

}
