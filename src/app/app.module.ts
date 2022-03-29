import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SigninComponent } from './pages/signin/signin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CourseAdvisersComponent } from './pages/course-advisers/course-advisers.component';
import { HomeFeatureComponent } from './components/home-feature/home-feature.component';
import { FormFieldComponent } from './components/form-field/form-field.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SigninComponent,
    CourseAdvisersComponent,
    HomeFeatureComponent,
    FormFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
