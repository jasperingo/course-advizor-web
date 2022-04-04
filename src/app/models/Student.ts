import { Expose, Type } from "class-transformer";
import { CourseAdviser } from "./CourseAdviser";
import { StudentResult } from "./StudentResult";

export class Student {

  @Expose()
  @Type(()=> Number)
  id?: number;

  @Expose({ name: 'first_name' })
  firstName?: string;

  @Expose({ name: 'last_name' })
  lastName?: string;

  @Expose({ name: 'matriculation_number' })
  matriculationNumber?: string;

  @Expose({ name: 'phone_number' })
  phoneNumber?: string;

  @Type(()=> Date)
  @Expose({ name: 'created_at' })
  createdAt?: Date;

  @Type(()=> CourseAdviser)
  @Expose({ name: 'course_adviser' })
  courseAdviser?: CourseAdviser;

  @Type(()=> StudentResult)
  @Expose({ name: 'student_result' })
  studentResult?: StudentResult[];

}
