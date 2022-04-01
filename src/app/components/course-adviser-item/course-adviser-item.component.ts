import { Component, Input } from '@angular/core';
import { CourseAdviser } from 'src/app/models/CourseAdviser';

@Component({
  selector: 'app-course-adviser-item',
  templateUrl: './course-adviser-item.component.html',
  styleUrls: ['./course-adviser-item.component.css']
})
export class CourseAdviserItemComponent {

  @Input() item: CourseAdviser | null = null;

}
