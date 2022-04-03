import { Injectable } from '@angular/core';
import { CourseAdviser } from 'src/app/models/CourseAdviser';

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
  }
}
