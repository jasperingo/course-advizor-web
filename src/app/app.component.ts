import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  currentUrl = '';

  routerSubScription?: Subscription;

  constructor(private router: Router) {}
  
  get onIndex() {
    return !/^\/account*/.test(this.currentUrl)
  }
  
  ngOnInit() {
    this.routerSubScription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }
  
  ngOnDestroy(): void {
    this.routerSubScription?.unsubscribe();
  }

}
