import { Expose, Type } from "class-transformer";

export class CourseAdviserCreateDTO {

  [index: string]: any;

  @Expose({ name: 'first_name' })
  firstName?: string;

  @Expose({ name: 'last_name' })
  lastName?: string;

  @Expose({ name: 'phone_number' })
  phoneNumber?: string;

  @Expose()
  pin?: string;

  @Type(()=> Number)
  @Expose({ name: 'session_id' })
  sessionId?: number;

  @Type(()=> Number)
  @Expose({ name: 'department_id' })
  departmentId?: number;

}
