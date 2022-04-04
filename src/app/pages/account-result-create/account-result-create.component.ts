import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { FormSelectOptionsType } from 'src/app/components/form-select/form-select.component';
import { ResultCreateDTO } from 'src/app/dtos/ResultCreateDTO';
import { Result, Semester } from 'src/app/models/Result';
import { Session } from 'src/app/models/Session';
import { ClassMapperService } from 'src/app/services/class-mapper/class-mapper.service';
import { CourseAdviserService } from 'src/app/services/course-adviser/course-adviser.service';

@Component({
  selector: 'app-account-result-create',
  templateUrl: './account-result-create.component.html',
  styleUrls: ['./account-result-create.component.css']
})
export class AccountResultCreateComponent implements OnInit {

  loading = false;

  error: string | null = null;

  semesterError = new Map<string, string>();
  
  sessionIdError = new Map<string, string>();

  courseCodeError = new Map<string, string>([['pattern', 'Course code must be 3 capital letters followed by 3 numbers']]);

  sessionLoaded = false;

  sessionLoading = false;

  sessionError: string | null = null;

  sessions: FormSelectOptionsType = [];

  semesters: FormSelectOptionsType = [
    { value: Semester.FIRST, text: Semester.FIRST },
    { value: Semester.SECOND, text: Semester.SECOND }
  ];

  resultForm = new FormGroup({
    courseCode: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{3}[0-9]{3}$/)]),
    semester: new FormControl('', [Validators.required]),
    sessionId: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private httpService: HttpClient, 
    private classMapper: ClassMapperService,
    private courseAdviserService: CourseAdviserService
  ) { }

  ngOnInit(): void {
    if (!this.sessionLoaded) {
      this.fetchSessions();
    }
  }

  retryFetchSessions() {
    this.sessionError = null;
    this.fetchSessions();
  }

  fetchSessions() {
    
    if (this.sessionLoading) return;

    this.sessionLoading = true;

    this.httpService
      .get(AppModule.toApiUrl('session'))
      .pipe(this.classMapper.responseToInstance<Session[]>(Session))
      .subscribe({ 
        next: data => {
          this.sessionLoaded = true;
          this.sessionLoading = false;
          this.sessions = data.data.map(i => ({ value: String(i.id), text: `${i.startedAt}/${i.endedAt}` }));
        },
        error: () =>  {
          this.sessionLoading = false;
          this.sessionError = "Oops! Something went wrong.";
        }
      });
  }

  onSubmit() {
    if (this.loading) return;

    this.error = null;

    if (!this.resultForm.valid) {
      this.resultForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.resultForm.disable();
    
    const headers = new HttpHeaders({ Authorization: String(this.courseAdviserService.courseAdviser?.id) });

    this.httpService
      .post(
        AppModule.toApiUrl('result'), 
        this.classMapper.toPlain(this.resultForm.value, ResultCreateDTO),
        { headers }
      )
      .pipe(this.classMapper.responseToInstance<Result>(Result))
      .subscribe({ 
        next: res => {
          this.loading = false;
          this.resultForm.enable();
          this.router.navigateByUrl(`/account/results/${res.data.id}`);
        },
        error: (error) =>  {
          this.loading = false;

          this.resultForm.enable();
          
          switch(error.status) {

            case 400:
              this.onResponseInputErrors(error.error.data);
              break;

            default: 
              this.error = 'Oops! Something went wrong.';
          }
        }
      });
  }

  onResponseInputErrors(errors: { name: string; message: string }[]) {
    for (let err of errors) {
      switch(err.name) {
        case 'course_code':
          this.courseCodeError.set('fromServer', err.message);
          this.resultForm.controls['courseCode'].setErrors({ fromServer: true });
          break;

        case 'semester':
          this.semesterError.set('fromServer', err.message);
          this.resultForm.controls['semester'].setErrors({ fromServer: true });
          break;

        case 'session_id':
          this.sessionIdError.set('fromServer', err.message);
          this.resultForm.controls['sessionId'].setErrors({ fromServer: true });
          break;

        default:
          this.error = err.message;
      }
    }
  }

}
