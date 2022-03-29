import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseAdvisersComponent } from './pages/course-advisers/course-advisers.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-in', component: SigninComponent },
  { path: 'course-advisers', component: CourseAdvisersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
