import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { FormSelectOptionsType } from 'src/app/components/form-select/form-select.component';
import { CourseAdviserCreateDTO } from 'src/app/dtos/CourseAdviserCreateDTO';
import { ResponseDTO } from 'src/app/dtos/ResponseDTO';
import { CourseAdviser } from 'src/app/models/CourseAdviser';
import { Department } from 'src/app/models/Department';
import { Session } from 'src/app/models/Session';
import { ClassMapperService } from 'src/app/services/class-mapper/class-mapper.service';
import { CourseAdviserService } from 'src/app/services/course-adviser/course-adviser.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  loading = false;

  error: string | null = null;

  firstNameServerError = '';

  lastNameServerError = '';
  
  phoneNumberServerError = '';

  pinServerError = '';

  sessionIdServerError = '';

  departmentIdServerError = '';

  sessionLoaded = false;

  sessionLoading = false;

  sessionError: string | null = null;

  sessions: FormSelectOptionsType = [];

  departmentLoaded = false;

  departmentLoading = false;

  departmentError: string | null = null;

  departments: FormSelectOptionsType = [];

  signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    pin: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    sessionId: new FormControl('', [Validators.required]),
    departmentId: new FormControl('', [Validators.required])
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

    if (!this.departmentLoaded) {
      this.fetchDepartments();
    }
  }

  fetchDepartments() {
    
    if (this.departmentLoading) return;

    this.departmentLoading = true;

    this.httpService
      .get(AppModule.toApiUrl('department'))
      .pipe(this.classMapper.responseToInstance(Department))
      .subscribe({ 
        next: data => {
          this.departmentLoaded = true;
          this.departmentLoading = false;
          this.departments = data.data.map((i: Department)=> ({ value: String(i.id), text: i.name }));
        },
        error: () =>  {
          this.departmentLoading = false;
          this.departmentError = "Oops! Something went wrong.";
        }
      });
  }

  fetchSessions() {
    
    if (this.sessionLoading) return;

    this.sessionLoading = true;

    this.httpService
      .get(AppModule.toApiUrl('session'))
      .pipe(this.classMapper.responseToInstance(Session))
      .subscribe({ 
        next: data => {
          this.sessionLoaded = true;
          this.sessionLoading = false;
          this.sessions = data.data.map((i: Session)=> ({ value: String(i.id), text: `${i.startedAt}/${i.endedAt}` }));
        },
        error: () =>  {
          this.sessionLoading = false;
          this.sessionError = "Oops! Something went wrong.";
        }
      });
  }

  onSubmit() {
    
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    if (this.loading) return;

    this.loading = true;

    this.httpService
      .post<ResponseDTO<CourseAdviser>>(
        AppModule.toApiUrl('course-adviser'), 
        this.classMapper.toPlain(this.signUpForm.value, CourseAdviserCreateDTO)
      )
      .pipe(this.classMapper.responseToInstance(CourseAdviser))
      .subscribe({ 
        next: res => {
          this.loading = false;
          this.courseAdviserService.courseAdviser = res.data;
          this.router.navigateByUrl('/account/dashboard');
        },
        error: (error) =>  {
          this.loading = false;
          
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
        case 'first_name':
          this.firstNameServerError = err.message;
          this.signUpForm.controls['firstName'].setErrors({ fromServer: true });
          break;

        case 'last_name':
          this.lastNameServerError = err.message;
          this.signUpForm.controls['lastName'].setErrors({ fromServer: true });
          break;

        case 'phone_number':
          this.phoneNumberServerError = err.message;
          this.signUpForm.controls['phoneNumber'].setErrors({ fromServer: true });
          break;

        case 'pin':
          this.pinServerError = err.message;
          this.signUpForm.controls['pin'].setErrors({ fromServer: true });
          break;

        case 'session_id':
          this.sessionIdServerError = err.message;
          this.signUpForm.controls['sessionId'].setErrors({ fromServer: true });
          break;

        case 'department_id':
          this.departmentIdServerError = err.message;
          this.signUpForm.controls['departmentId'].setErrors({ fromServer: true });
          break;

        default:
          this.error = err.message;
      }
    }
  }

}
