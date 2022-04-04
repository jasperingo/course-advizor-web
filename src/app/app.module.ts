import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
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
import { DashboardComponent, DashboardItemComponent } from './pages/dashboard/dashboard.component';
import { ListEmptyComponent } from './components/list-empty/list-empty.component';
import { ErrorBoxComponent } from './components/error-box/error-box.component';
import { ListComponent } from './components/list/list.component';
import { CourseAdviserItemComponent } from './components/course-adviser-item/course-adviser-item.component';
import { CourseAdviserStudentComponent } from './pages/course-adviser-student/course-adviser-student.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { environment } from 'src/environments/environment';
import { FormMessageComponent } from './components/form-message/form-message.component';
import { AccountHeaderComponent, AccountHeaderNavButtonComponent } from './components/account-header/account-header.component';
import { AccountStudentsComponent } from './pages/account-students/account-students.component';
import { AccountResultsComponent } from './pages/account-results/account-results.component';
import { AccountAppointmentsComponent } from './pages/account-appointments/account-appointments.component';
import { AccountReportsComponent } from './pages/account-reports/account-reports.component';
import { AccountProfileComponent } from './pages/account-profile/account-profile.component';
import { StudentItemComponent } from './components/student-item/student-item.component';
import { ResultItemComponent } from './components/result-item/result-item.component';
import { TableComponent } from './components/table/table.component';
import { AccountResultCreateComponent } from './pages/account-result-create/account-result-create.component';
import { AccountResultComponent } from './pages/account-result/account-result.component';
import { AppointmentItemComponent } from './components/appointment-item/appointment-item.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReportItemComponent } from './components/report-item/report-item.component';

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
    FormSelectComponent,
    FormMessageComponent,
    AccountHeaderComponent,
    AccountHeaderNavButtonComponent,
    AccountStudentsComponent,
    AccountResultsComponent,
    AccountAppointmentsComponent,
    AccountReportsComponent,
    AccountProfileComponent,
    DashboardItemComponent,
    StudentItemComponent,
    ResultItemComponent,
    TableComponent,
    AccountResultCreateComponent,
    AccountResultComponent,
    AppointmentItemComponent,
    ModalComponent,
    ReportItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  static toApiUrl(path: string) {
    return `${environment.apiUrl}${path}`;
  }

}
