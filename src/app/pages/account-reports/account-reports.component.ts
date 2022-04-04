import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppModule } from 'src/app/app.module';
import { Report } from 'src/app/models/Report';
import { ClassMapperService } from 'src/app/services/class-mapper/class-mapper.service';
import { CourseAdviserService } from 'src/app/services/course-adviser/course-adviser.service';

@Component({
  selector: 'app-account-reports',
  templateUrl: './account-reports.component.html',
  styleUrls: ['./account-reports.component.css']
})
export class AccountReportsComponent implements OnInit {

  loaded = false;
  
  loading = false;
  
  error: string | null = null;

  list: Report[] = [];

  constructor(
    private httpService: HttpClient, 
    private classMapper: ClassMapperService,
    private courseAdviserService: CourseAdviserService
  ) { }

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

    const headers = new HttpHeaders({ Authorization: String(this.courseAdviserService.courseAdviser?.id) });

    this.httpService
      .get(AppModule.toApiUrl('report'), { headers })
      .pipe(this.classMapper.responseToInstance<Report[]>(Report))
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
