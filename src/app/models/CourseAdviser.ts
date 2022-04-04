import { Type, Expose } from 'class-transformer';
import { Department } from './Department';
import { Session } from './Session';

export class CourseAdviser {

  @Expose()
  @Type(()=> Number)
  id?: number;

  @Expose({ name: 'first_name' })
  firstName?: string;

  @Expose({ name: 'last_name' })
  lastName?: string;

  @Expose({ name: 'phone_number' })
  phoneNumber?: string;

  @Expose()
  pin?: string;

  @Expose()
  @Type(()=> Session)
  session?: Session;

  @Expose()
  @Type(()=> Department)
  department?: Department;

}
