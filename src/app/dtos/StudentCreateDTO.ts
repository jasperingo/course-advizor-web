import { Expose, Type } from "class-transformer";

export class StudentCreateDTO {

  @Expose({ name: 'first_name' })
  firstName?: string;

  @Expose({ name: 'last_name' })
  lastName?: string;

  @Expose({ name: 'phone_number' })
  phoneNumber?: string;

  @Expose({ name: 'matriculation_number' })
  matriculationNumber?: string;

  @Type(()=> Number)
  @Expose({ name: 'course_adviser_id' })
  courseAdviserId?: number;

}
