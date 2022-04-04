import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseAdviserService } from 'src/app/services/course-adviser/course-adviser.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent {

  constructor(
    private router: Router,
    private courseAdviserService: CourseAdviserService,
  ) { }

  get courseAdviser() {
    return this.courseAdviserService.courseAdviser;
  }

  onSignOutSubmit(e: Event) {
    e.preventDefault();
    this.courseAdviserService.courseAdviser = null;
    this.router.navigateByUrl('/');
  }

}
