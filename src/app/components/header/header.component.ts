import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public hideMenu: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.hideMenu = !this.hideMenu;
  }

}
