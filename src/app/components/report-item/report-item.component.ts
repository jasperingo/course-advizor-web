import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { Report } from 'src/app/models/Report';
import { ClassMapperService } from 'src/app/services/class-mapper/class-mapper.service';
import { CourseAdviserService } from 'src/app/services/course-adviser/course-adviser.service';

@Component({
  selector: 'app-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.css']
})
export class ReportItemComponent {

  @Input() item!: Report;

  showModal = false;

  updateLoading = false;

  updateSuccess: string | null = null;

  updateError: string | null = null;

  updateForm = new FormGroup({
    reply: new FormControl('', [Validators.required])
  });

  constructor(
    private httpService: HttpClient, 
    private classMapper: ClassMapperService,
    private courseAdviserService: CourseAdviserService
  ) { }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  onUpdateSubmit() {
    if (this.updateLoading) return;

    this.updateError = null;
    
    this.updateSuccess = null;

    if (!this.updateForm.valid) {
      this.updateForm.markAllAsTouched();
      return;
    }
    
    this.updateLoading = true;

    this.updateForm.disable();

    const headers = new HttpHeaders({ Authorization: String(this.courseAdviserService.courseAdviser?.id) });

    this.httpService
      .put(
        AppModule.toApiUrl(`report/${this.item.id}`), 
        this.classMapper.toPlain(this.updateForm.value, Report),
        { headers }
      )
      .pipe(this.classMapper.responseToInstance<Report>(Report))
      .subscribe({ 
        next: res => {
          this.updateLoading = false;
          this.item.reply = res.data.reply;
          this.updateSuccess = 'Reply sent';
        },
        error: (error) =>  {
          this.updateLoading = false;

          this.updateForm.enable();
          
          switch(error.status) {

            case 400:
              for (const err of error.error.data)
                if (err.name === 'reply')
                  this.updateError = err.message;
              break;

            default: 
              this.updateError = 'Oops! Something went wrong.';
          }
        }
      });
  }

}
