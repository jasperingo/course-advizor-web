import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppModule } from 'src/app/app.module';
import { CourseAdviser } from 'src/app/models/CourseAdviser';
import { ClassMapperService } from 'src/app/services/class-mapper/class-mapper.service';

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

  constructor(private httpService: HttpClient, private classMapper: ClassMapperService) { }

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
      .get(AppModule.toApiUrl('course-adviser'))
      .pipe(this.classMapper.responseToInstance<CourseAdviser[]>(CourseAdviser))
      .subscribe({ 
        next: data => {
          this.loaded = true;
          this.loading = false;
          this.list = data.data;
        }, 
        error: () =>  {
          this.loading = false;
          this.error = "Oops! Something went wrong.";
        }
      });
  }

}
