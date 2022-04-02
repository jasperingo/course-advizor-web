import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-adviser-student',
  templateUrl: './course-adviser-student.component.html',
  styleUrls: ['./course-adviser-student.component.css']
})
export class CourseAdviserStudentComponent implements OnInit {

  loading = false;

  error: string | null = null;

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

  constructor() { }

  ngOnInit(): void {
  }

}
