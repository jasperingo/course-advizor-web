import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { CourseAdviserCreateDTO } from 'src/app/dtos/CourseAdviserCreateDTO';
import { ResponseDTO } from 'src/app/dtos/ResponseDTO';
import { CourseAdviser } from 'src/app/models/CourseAdviser';
import { ClassMapperService } from 'src/app/services/class-mapper/class-mapper.service';
import { CourseAdviserService } from 'src/app/services/course-adviser/course-adviser.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  loading = false;

  error: string | null = null;

  pinError = new Map<string, string>([['maxlength', 'Pin must be 4 characters long']]);

  phoneNumberError = new Map<string, string>([['maxlength', 'Phone number must be 11 characters long']]);

  signInForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    pin: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)])
  });

  constructor(
    private router: Router,
    private httpService: HttpClient, 
    private classMapper: ClassMapperService,
    private courseAdviserService: CourseAdviserService
  ) { }
  
  onSubmit() {

    if (this.loading) return;

    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    
    this.loading = true;

    this.signInForm.disable();

    this.httpService
      .post<ResponseDTO<CourseAdviser>>(
        AppModule.toApiUrl('course-adviser/auth'), 
        this.classMapper.toPlain(this.signInForm.value, CourseAdviserCreateDTO)
      )
      .pipe(this.classMapper.responseToInstance(CourseAdviser))
      .subscribe({ 
        next: res => {
          this.loading = false;
          this.signInForm.enable();
          this.courseAdviserService.courseAdviser = res.data;
          this.router.navigateByUrl('/account/dashboard');
        },
        error: (error) =>  {
          this.loading = false;

          this.signInForm.enable();
          
          switch(error.status) {

            case 400:
            case 401:
              this.error = 'Credentials are incorrect';
              break;

            default: 
              this.error = 'Oops! Something went wrong.';
          }
        }
      });
  }
}
