import { Expose, Type } from "class-transformer";
import { Grade } from "../models/StudentResult";

export class StudentResultCreateDTO {

  @Expose()
  grade?: Grade;
  
  @Type(()=> Number)
  @Expose({ name: 'student_id' })
  studentId?: number;

  @Type(()=> Number)
  @Expose({ name: 'result_id' })
  resultId?: number;

}
