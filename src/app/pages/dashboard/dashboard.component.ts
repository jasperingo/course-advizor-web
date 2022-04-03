import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AppModule } from 'src/app/app.module';
import { CourseAdviserStatisticsDTO } from 'src/app/dtos/CourseAdviserStatisticsDTO';
import { ClassMapperService } from 'src/app/services/class-mapper/class-mapper.service';
import { CourseAdviserService } from 'src/app/services/course-adviser/course-adviser.service';


@Component({
  selector: 'app-dashboard-item',
  template:  `
    <li>
      <div class="border border-blue-500 rounded text-center px-4 py-8">
        <div class="text-4xl mb-2">{{ value }}</div>
        <div>{{ text }}</div>
      </div>
    </li>
  `,
})
export class DashboardItemComponent {

  @Input() text!: string;

  @Input() value!: number;

}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  loading = false;
  
  error: string | null = null;

  statistics: CourseAdviserStatisticsDTO | null = null;

  constructor(
    private httpService: HttpClient, 
    private classMapper: ClassMapperService,
    public courseAdviserService: CourseAdviserService
  ) { }

  ngOnInit(): void {
    if (this.statistics === null) {
      this.fetchStatistics();
    }
  }

  retryFetchStatistics() {
    this.error = null;
    this.fetchStatistics();
  }

  fetchStatistics() {
    
    if (this.loading) return;

    this.loading = true;

    const headers = new HttpHeaders({ Authorization: String(this.courseAdviserService.courseAdviser?.id) });

    this.httpService
      .get(AppModule.toApiUrl('course-adviser/statistics'), { headers })
      .pipe(this.classMapper.responseToInstance(CourseAdviserStatisticsDTO))
      .subscribe({ 
        next: data => {
          this.loading = false;
          this.statistics = data.data;
        }, 
        error: () =>  {
          this.loading = false;
          this.error = "Oops! Something went wrong.";
        }
      });
  }

}
