import { Component, Input } from '@angular/core';
import { Student } from 'src/app/models/Student';

@Component({
  selector: 'tr[app-student-item]',
  templateUrl: './student-item.component.html',
  styleUrls: ['./student-item.component.css']
})
export class StudentItemComponent {
  @Input() serialNumber!: number;

  @Input() item!: Student;

}
