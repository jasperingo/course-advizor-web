import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountAppointmentsComponent } from './pages/account-appointments/account-appointments.component';
import { AccountProfileComponent } from './pages/account-profile/account-profile.component';
import { AccountReportsComponent } from './pages/account-reports/account-reports.component';
import { AccountResultCreateComponent } from './pages/account-result-create/account-result-create.component';
import { AccountResultComponent } from './pages/account-result/account-result.component';
import { AccountResultsComponent } from './pages/account-results/account-results.component';
import { AccountStudentsComponent } from './pages/account-students/account-students.component';
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
      { path: '', component: DashboardComponent },
      { path: 'students', component: AccountStudentsComponent },
      { path: 'results', component: AccountResultsComponent },
      { path: 'results/create', component: AccountResultCreateComponent },
      { path: 'results/:id', component: AccountResultComponent },
      { path: 'appointments', component: AccountAppointmentsComponent },
      { path: 'reports', component: AccountReportsComponent },
      { path: 'profile', component: AccountProfileComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
