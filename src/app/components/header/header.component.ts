import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  hideMenu: boolean = true;

  ivrNumber = environment.ivrNumber;

  toggleMenu(): void {
    this.hideMenu = !this.hideMenu;
  }

}
