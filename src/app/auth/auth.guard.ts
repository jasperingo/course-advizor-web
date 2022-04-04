import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { CourseAdviserService } from '../services/course-adviser/course-adviser.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private courseAdviserService: CourseAdviserService
  ) {}

  canActivate() {
    return this.checkAuthState();
  }

  canActivateChild() {
    return this.checkAuthState();
  }

  checkAuthState() {

    if (this.courseAdviserService.courseAdviser !== null) {
      return true;
    }

    return this.router.parseUrl('/sign-in');
  }
  
}
