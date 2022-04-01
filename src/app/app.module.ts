import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SigninComponent } from './pages/signin/signin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CourseAdvisersComponent } from './pages/course-advisers/course-advisers.component';
import { HomeFeatureComponent } from './components/home-feature/home-feature.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ResponseMapperInterceptor } from './services/response-mapper/response-mapper.interceptor';
import { ListEmptyComponent } from './components/list-empty/list-empty.component';
import { ErrorBoxComponent } from './components/error-box/error-box.component';
import { ListComponent } from './components/list/list.component';
import { CourseAdviserItemComponent } from './components/course-adviser-item/course-adviser-item.component';
import { CourseAdviserStudentComponent } from './pages/course-adviser-student/course-adviser-student.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormSelectComponent } from './components/form-select/form-select.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SigninComponent,
    CourseAdvisersComponent,
    HomeFeatureComponent,
    FormFieldComponent,
    LoadingComponent,
    SignUpComponent,
    FooterComponent,
    DashboardComponent,
    ListEmptyComponent,
    ErrorBoxComponent,
    ListComponent,
    CourseAdviserItemComponent,
    CourseAdviserStudentComponent,
    FormButtonComponent,
    FormSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ResponseMapperInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
