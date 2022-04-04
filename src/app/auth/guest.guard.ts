import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CourseAdviserService } from '../services/course-adviser/course-adviser.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(
    private router: Router,
    private courseAdviserService: CourseAdviserService
  ) {}

  canActivate() {

    if (this.courseAdviserService.courseAdviser === null) {
      return true;
    }

    return this.router.parseUrl('/account');
  }
  
}
