import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input() colorWhite = false;

  @Input() size: 'big' | 'small' = 'small';

  constructor() { }

  ngOnInit(): void {
  }

  get layoutSize() {
    return {
      'border-t-white': this.colorWhite,
      'h-12 w-12': this.size === 'big',
      'w-5 h-5': this.size === 'small'
    }
  }

}
