import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { ResponseDTO } from 'src/app/dtos/ResponseDTO';
import { StudentCreateDTO } from 'src/app/dtos/StudentCreateDTO';
import { CourseAdviser } from 'src/app/models/CourseAdviser';
import { Student } from 'src/app/models/Student';
import { ClassMapperService } from 'src/app/services/class-mapper/class-mapper.service';

@Component({
  selector: 'app-course-adviser-student',
  templateUrl: './course-adviser-student.component.html',
  styleUrls: ['./course-adviser-student.component.css']
})
export class CourseAdviserStudentComponent implements OnInit {

  courseAdviserID = '';

  courseAdviserLoading = false;

  courseAdviserError: string | null = null;

  courseAdviser: CourseAdviser | null = null;


  loading = false;

  error: string | null = null;

  success: string | null = null;

  firstNameError = new Map<string, string>();

  lastNameError = new Map<string, string>();

  phoneNumberError = new Map<string, string>([['maxlength', 'Phone number must be 11 characters long']]);
  
  matriculationNumberError = new Map<string, string>([['maxlength', 'Pin must be 11 characters long']]);

  studentForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    courseAdviserId: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    matriculationNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
  });

  constructor(
    private route: ActivatedRoute, 
    private httpService: HttpClient,
    private classMapper: ClassMapperService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseAdviserID = params['id'];
      this.studentForm.controls['courseAdviserId'].setValue(params['id']);
    });

    if (this.courseAdviser === null) {
      this.fetchCourseAdviser();
    }
  }

  retryFetchCourseAdviser() {
    this.courseAdviserError = null;
    this.fetchCourseAdviser();
  }

  fetchCourseAdviser() {
    
    if (this.courseAdviserLoading) return;

    this.courseAdviserLoading = true;

    this.httpService
      .get(AppModule.toApiUrl(`course-adviser/${this.courseAdviserID}`))
      .pipe(this.classMapper.responseToInstance<CourseAdviser>(CourseAdviser))
      .subscribe({ 
        next: res => {
          this.courseAdviserLoading = false;
          this.courseAdviser = res.data;
        },
        error: () =>  {
          this.courseAdviserLoading = false;
          this.courseAdviserError = "Oops! Something went wrong.";
        }
      });
  }

  onSubmit() {

    if (this.loading) return;

    this.error = null;

    this.success = null;

    if (!this.studentForm.valid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.studentForm.disable();

    this.httpService
      .post<ResponseDTO<Student>>(
        AppModule.toApiUrl('student'), 
        this.classMapper.toPlain(this.studentForm.value, StudentCreateDTO)
      )
      .subscribe({ 
        next: () => {
          this.loading = false;
          this.studentForm.enable();
          this.studentForm.reset();
          this.success = 'Your registration was successful';
        },
        error: (error) =>  {
          this.loading = false;

          this.studentForm.enable();
          
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
          this.studentForm.controls['firstName'].setErrors({ fromServer: true });
          break;

        case 'last_name':
          this.lastNameError.set('fromServer', err.message);
          this.studentForm.controls['lastName'].setErrors({ fromServer: true });
          break;

        case 'phone_number':
          this.phoneNumberError.set('fromServer', err.message);
          this.studentForm.controls['phoneNumber'].setErrors({ fromServer: true });
          break;

        case 'matriculation_number':
          this.matriculationNumberError.set('fromServer', err.message);
          this.studentForm.controls['matriculationNumber'].setErrors({ fromServer: true });
          break;
  
        default:
          this.error = err.message;
      }
    }
  }

}
