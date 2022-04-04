import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-account-header-nav-button',
  template: `
    <li class="mb-4">
      <a 
        [routerLink]="href"
        (click)="linkClicked()"
        [routerLinkActiveOptions]="{ exact: true }"
        routerLinkActive="bg-blue-500 text-white hover:bg-blue-900" 
        class="flex items-center gap-1 px-2 py-4 font-bold rounded-l-3xl ml-2 text-blue-500 hover:bg-blue-100" 
        >
        <mat-icon>{{ icon }}</mat-icon>
        <span>{{ text }}</span>
      </a>
    </li>
  `,
  styles: [':host { display: block; }']
})
export class AccountHeaderNavButtonComponent {

  @Input() text!: string;

  @Input() href!: string;

  @Input() icon!: string;

  @Output() onLinkClick = new EventEmitter();

  linkClicked() {
    this.onLinkClick.emit();
  }
}


@Component({
  selector: 'app-account-header',
  templateUrl: './account-header.component.html',
  styleUrls: ['./account-header.component.css']
})
export class AccountHeaderComponent {

  public hideMenu: boolean = true;

  toggleMenu(): void {
    this.hideMenu = !this.hideMenu;
  }

}
