import { Injectable } from '@angular/core';
import { CourseAdviser } from 'src/app/models/CourseAdviser';
import { Department } from 'src/app/models/Department';
import { Session } from 'src/app/models/Session';

@Injectable({
  providedIn: 'root'
})
export class CourseAdviserService {

  courseAdviser: CourseAdviser | null = null;

  constructor() { 
    this.courseAdviser = new CourseAdviser();
    this.courseAdviser.firstName = "Brown";
    this.courseAdviser.lastName = "Beans";
    this.courseAdviser.id = 1;
    this.courseAdviser.phoneNumber = '+2349030592311';
    this.courseAdviser.department = new Department();
    this.courseAdviser.department.abbreviation = 'IFT';
    this.courseAdviser.department.name = 'Information Technology';
    this.courseAdviser.department.id = 2;
    this.courseAdviser.session = new Session();
    this.courseAdviser.session.startedAt = 2016;
    this.courseAdviser.session.endedAt = 2017;
  }
}
