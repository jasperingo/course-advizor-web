import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loading = false;

  signInForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    pin: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)])
  });

  constructor() { }

  ngOnInit(): void {
  }
  
  onSubmit() {
    if (this.signInForm.valid) {
      this.loading = true;
      this.signInForm.controls['pin'].disable();
      this.signInForm.controls['phoneNumber'].disable();
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
}
