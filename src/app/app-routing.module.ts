import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseAdviserStudentComponent } from './pages/course-adviser-student/course-adviser-student.component';
import { CourseAdvisersComponent } from './pages/course-advisers/course-advisers.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SigninComponent } from './pages/signin/signin.component';

const routes: Routes = [
  { 
    path: '', 
    children: [
      { path: '', component: HomeComponent },
      { path: 'sign-in', component: SigninComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'course-advisers', component: CourseAdvisersComponent },
      { path: 'course-adviser/:id/student', component: CourseAdviserStudentComponent },
    ] 
  },
  
  { 
    path: 'account', 
    children: [
      { path: 'dashboard', component: DashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
