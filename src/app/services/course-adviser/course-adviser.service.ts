import { Injectable } from '@angular/core';
import { CourseAdviser } from 'src/app/models/CourseAdviser';

@Injectable({
  providedIn: 'root'
})
export class CourseAdviserService {

  courseAdviser: CourseAdviser | null = null;

  constructor() { }
}
