import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ResponseDTO } from 'src/app/dtos/ResponseDTO';
import { CourseAdviser } from 'src/app/models/CourseAdviser';
import { Session } from 'src/app/models/Session';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  loading = false;

  signUpForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    pin: new FormControl('')
  });


  sessionLoaded = false;

  sessionLoading = false;

  sessionError: string | null = null;

  sessions: Session[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {

    if (!this.sessionLoaded) {
      this.fetchSessions();
    }

  }

  fetchSessions() {

    if (this.sessionLoading) return;

    this.sessionLoading = true;

    this.httpService
      .get<ResponseDTO<Session[]>>('session', Session)
      .subscribe({ 
        next: data => {
          this.sessionLoaded = true;
          this.sessionLoading = false;
          this.sessions = data.data as Session[];
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
      .post<ResponseDTO<CourseAdviser>>('course-adviser', null, CourseAdviser)
      .subscribe({ 
        next: data => {
          this.loading = false;
          console.log(data);
        }, 
        error: (error) =>  {
          this.loading = false;
          console.log(error.error);
        }
      });
  }

}
