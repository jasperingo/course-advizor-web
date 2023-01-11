import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { StudentResultCreateDTO } from 'src/app/dtos/StudentResultCreateDTO';
import { Result } from 'src/app/models/Result';
import { Student } from 'src/app/models/Student';
import { Grade, StudentResult } from 'src/app/models/StudentResult';
import { ClassMapperService } from 'src/app/services/class-mapper/class-mapper.service';
import { CourseAdviserService } from 'src/app/services/course-adviser/course-adviser.service';
import { FormSelectOptionsType } from '../form-select/form-select.component';

@Component({
  selector: 'tr[app-student-result-item]',
  templateUrl: './student-result-item.component.html',
  styleUrls: ['./student-result-item.component.css']
})
export class StudentResultItemComponent implements OnInit {
  @Input() serialNumber!: number;

  @Input() item!: Student;

  @Input() result!: Result;

  pickedGrade!: string;

  showModal = false;
  
  updateLoading = false;

  updateSuccess: string | null = null;

  updateError: string | null = null;

  gradeOptions: FormSelectOptionsType = Object.keys(Grade).map(i=> ({ value: i, text: i }));

  updateForm = new FormGroup({
    grade: new FormControl('', [Validators.required])
  });

  constructor(
    private httpService: HttpClient, 
    private classMapper: ClassMapperService,
    private courseAdviserService: CourseAdviserService
  ) { }

  get studentGrade() {
    return this.item.studentResult?.[0]?.grade;
  }

  ngOnInit(): void {
    this.updateForm.controls['grade'].setValue(this.studentGrade);
  }

  toggleModal() {
    if (!this.showModal) {
      this.updateError = null;
      this.updateSuccess = null;
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

    const req = this.item.studentResult?.length === 0 ?
      this.httpService
        .post(
          AppModule.toApiUrl('student-result'), 
          this.classMapper.toPlain(
            { ...this.updateForm.value, studentId: this.item.id, resultId: this.result.id }, 
            StudentResultCreateDTO
          ),
          { headers }
        )
      :
      this.httpService
        .put(
          AppModule.toApiUrl(`student-result/${this.item.studentResult?.[0]?.id}`), 
          this.classMapper.toPlain(this.updateForm.value, StudentResult),
          { headers }
        );

    req.pipe(this.classMapper.responseToInstance<StudentResult>(StudentResult))
      .subscribe({ 
        next: res => {
          this.updateLoading = false;
          this.updateForm.enable();
          this.item.studentResult = [res.data];
          this.updateSuccess = 'Student result updated';
        },
        error: (error) =>  {
          this.updateLoading = false;

          this.updateForm.enable();
          
          switch(error.status) {

            case 400:
              for (const err of error.error.data)
                if (err.name === 'grade')
                  this.updateError = err.message;
              break;

            default: 
              this.updateError = 'Oops! Something went wrong.';
          }
        }
      });
  }

}
