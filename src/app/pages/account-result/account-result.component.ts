import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { Result } from 'src/app/models/Result';
import { Student } from 'src/app/models/Student';
import { ClassMapperService } from 'src/app/services/class-mapper/class-mapper.service';
import { CourseAdviserService } from 'src/app/services/course-adviser/course-adviser.service';

@Component({
  selector: 'app-account-result',
  templateUrl: './account-result.component.html',
  styleUrls: ['./account-result.component.css']
})
export class AccountResultComponent implements OnInit {

  resultID = '';

  resultLoading = false;

  resultError: string | null = null;

  result: Result | null = null;


  studentLoaded = false;
  
  studentLoading = false;
  
  studentError: string | null = null;

  studentList: Student[] = [];

  constructor(
    private route: ActivatedRoute, 
    private httpService: HttpClient,
    private classMapper: ClassMapperService,
    private courseAdviserService: CourseAdviserService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.resultID = params['id'];
    });

    if (this.result === null) {
      this.fetchResult();
    }
  }

  retryFetchResult() {
    this.resultError = null;
    this.fetchResult();
  }

  fetchResult() {
    
    if (this.resultLoading) return;

    this.resultLoading = true;

    const headers = new HttpHeaders({ Authorization: String(this.courseAdviserService.courseAdviser?.id) });

    this.httpService
      .get(AppModule.toApiUrl(`result/${this.resultID}`), { headers })
      .pipe(this.classMapper.responseToInstance<Result>(Result))
      .subscribe({ 
        next: res => {
          this.resultLoading = false;
          this.result = res.data;
          this.fetchStudentList();
        },
        error: () =>  {
          this.resultLoading = false;
          this.resultError = "Oops! Something went wrong.";
        }
      });
  }


  retryFetchStudentList() {
    this.studentError = null;
    this.fetchStudentList();
  }

  fetchStudentList() {
    if (this.studentLoading) return;

    this.studentLoading = true;

    const headers = new HttpHeaders({ Authorization: String(this.courseAdviserService.courseAdviser?.id) });

    this.httpService
      .get(AppModule.toApiUrl(`result/${this.resultID}/student`), { headers })
      .pipe(this.classMapper.responseToInstance<Student[]>(Student))
      .subscribe({ 
        next: data => {
          this.studentLoaded = true;
          this.studentLoading = false;
          this.studentList = data.data;
        }, 
        error: () =>  {
          this.studentLoading = false;
          this.studentError = "Oops! Something went wrong.";
        }
      });
  }

}
