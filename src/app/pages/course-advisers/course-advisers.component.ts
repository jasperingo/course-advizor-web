import { Component, OnInit } from '@angular/core';
import { ResponseDTO } from 'src/app/dtos/ResponseDTO';
import { CourseAdviser } from 'src/app/models/CourseAdviser';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-course-advisers',
  templateUrl: './course-advisers.component.html',
  styleUrls: ['./course-advisers.component.css']
})
export class CourseAdvisersComponent implements OnInit {

  loaded = false;
  
  loading = false;
  
  error: string | null = null;

  list: CourseAdviser[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    if (!this.loading && !this.loaded) {
      this.fetchList();
    }
  }

  retryFetchList() {
    this.error = null;
    this.fetchList();
  }

  fetchList() {
    if (this.loading) return;

    this.loading = true;

    this.httpService
      .get<ResponseDTO<CourseAdviser[]>>('course-adviser', CourseAdviser)
      .subscribe({ 
        next: data => {
          this.loaded = true;
          this.loading = false;
          this.list = data.data as CourseAdviser[];
        }, 
        error: () =>  {
          this.loading = false;
          this.error = "Oops! Something went wrong.";
        }
      });
  }

}
