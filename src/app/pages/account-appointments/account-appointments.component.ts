import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppModule } from 'src/app/app.module';
import { Appointment } from 'src/app/models/Appointment';
import { ClassMapperService } from 'src/app/services/class-mapper/class-mapper.service';
import { CourseAdviserService } from 'src/app/services/course-adviser/course-adviser.service';

@Component({
  selector: 'app-account-appointments',
  templateUrl: './account-appointments.component.html',
  styleUrls: ['./account-appointments.component.css']
})
export class AccountAppointmentsComponent implements OnInit {

  loaded = false;
  
  loading = false;
  
  error: string | null = null;

  list: Appointment[] = [];

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
      .get(AppModule.toApiUrl('appointment'), { headers })
      .pipe(this.classMapper.responseToInstance<Appointment[]>(Appointment))
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
