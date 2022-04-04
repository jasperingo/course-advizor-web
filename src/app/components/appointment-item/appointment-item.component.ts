import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { Appointment, Status } from 'src/app/models/Appointment';
import { ClassMapperService } from 'src/app/services/class-mapper/class-mapper.service';
import { CourseAdviserService } from 'src/app/services/course-adviser/course-adviser.service';

@Component({
  selector: 'app-appointment-item',
  templateUrl: './appointment-item.component.html',
  styleUrls: ['./appointment-item.component.css']
})
export class AppointmentItemComponent {

  @Input() item!: Appointment;

  showModal = false;

  minDate = (new Date()).toISOString().substring(0, 16);
  
  updateLoading = false;

  updateSuccess: string | null = null;

  updateError: string | null = null;

  updateForm = new FormGroup({
    status: new FormControl(Status.ACCEPTED, [Validators.required]),
    startedAt: new FormControl('', [Validators.required])
  });

  constructor(
    private httpService: HttpClient, 
    private classMapper: ClassMapperService,
    private courseAdviserService: CourseAdviserService
  ) { }

  get ended() {
    if (!this.item.startedAt) return false;
    return this.item.startedAt.getTime() < Date.now();
  }

  toggleModal() {
    if (!this.showModal) {
      this.updateError = null;
      this.updateSuccess = null;
      this.updateForm.controls['startedAt'].setValue(this.item.startedAt?.toISOString().substring(0, 16))
    }
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
        AppModule.toApiUrl(`appointment/${this.item.id}`), 
        this.classMapper.toPlain(this.updateForm.value, Appointment),
        { headers }
      )
      .pipe(this.classMapper.responseToInstance<Appointment>(Appointment))
      .subscribe({ 
        next: res => {
          this.updateLoading = false;
          this.updateForm.enable();
          this.item.status = res.data.status;
          this.item.startedAt = res.data.startedAt;
          this.updateSuccess = 'Appointment updated';
        },
        error: (error) =>  {
          this.updateLoading = false;

          this.updateForm.enable();
          
          switch(error.status) {

            case 400:
              for (const err of error.error.data)
                if (err.name === 'started_at')
                  this.updateError = err.message;
              break;

            default: 
              this.updateError = 'Oops! Something went wrong.';
          }
        }
      });
  }

}
