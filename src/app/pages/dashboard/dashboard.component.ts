import { Component, OnInit } from '@angular/core';
import { CourseAdviserService } from 'src/app/services/course-adviser/course-adviser.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private courseAdviserService: CourseAdviserService) { }

  ngOnInit(): void {
    console.log(this.courseAdviserService.courseAdviser)
  }

}
