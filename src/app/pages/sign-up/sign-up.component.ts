import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { FormSelectOptionsType } from 'src/app/components/form-select/form-select.component';
import { CourseAdviserCreateDTO } from 'src/app/dtos/CourseAdviserCreateDTO';
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

  firstNameError = new Map<string, string>();

  lastNameError = new Map<string, string>();
  
  sessionIdError = new Map<string, string>();

  departmentIdError = new Map<string, string>();

  pinError = new Map<string, string>([['maxlength', 'Pin must be 4 characters long']]);

  phoneNumberError = new Map<string, string>([['maxlength', 'Phone number must be 11 characters long']]);


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
    sessionId: new FormControl('', [Validators.required]),
    departmentId: new FormControl('', [Validators.required]),
    pin: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)])
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

  retryFetchSessionsOrDepartments() {
    if (this.departmentError !== null) {
      this.departmentError = null;
      this.fetchDepartments();
    }

    if (this.sessionError !== null) {
      this.sessionError = null;
      this.fetchSessions();
    }
  }

  fetchDepartments() {
    
    if (this.departmentLoading) return;

    this.departmentLoading = true;

    this.httpService
      .get(AppModule.toApiUrl('department'))
      .pipe(this.classMapper.responseToInstance<Department[]>(Department))
      .subscribe({ 
        next: data => {
          this.departmentLoaded = true;
          this.departmentLoading = false;
          this.departments = data.data.map(i => ({ value: String(i.id), text: String(i.name) }));
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

    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.signUpForm.disable();

    this.httpService
      .post(
        AppModule.toApiUrl('course-adviser'), 
        this.classMapper.toPlain(this.signUpForm.value, CourseAdviserCreateDTO)
      )
      .pipe(this.classMapper.responseToInstance<CourseAdviser>(CourseAdviser))
      .subscribe({ 
        next: res => {
          this.loading = false;
          this.signUpForm.enable();
          this.courseAdviserService.courseAdviser = res.data;
          this.router.navigateByUrl('/account');
        },
        error: (error) =>  {
          this.loading = false;

          this.signUpForm.enable();
          
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
          this.firstNameError.set('fromServer', err.message);
          this.signUpForm.controls['firstName'].setErrors({ fromServer: true });
          break;

        case 'last_name':
          this.lastNameError.set('fromServer', err.message);
          this.signUpForm.controls['lastName'].setErrors({ fromServer: true });
          break;

        case 'phone_number':
          this.phoneNumberError.set('fromServer', err.message);
          this.signUpForm.controls['phoneNumber'].setErrors({ fromServer: true });
          break;

        case 'pin':
          this.pinError.set('fromServer', err.message);
          this.signUpForm.controls['pin'].setErrors({ fromServer: true });
          break;

        case 'session_id':
          this.sessionIdError.set('fromServer', err.message);
          this.signUpForm.controls['sessionId'].setErrors({ fromServer: true });
          break;

        case 'department_id':
          this.departmentIdError.set('fromServer', err.message);
          this.signUpForm.controls['departmentId'].setErrors({ fromServer: true });
          break;

        default:
          this.error = err.message;
      }
    }
  }

}
