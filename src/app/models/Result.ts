import { Expose, Type } from "class-transformer";
import { Session } from './Session';

export enum Semester {
  FIRST = 'first',
  SECOND = 'second'
}

export class Result {

  @Expose()
  @Type(()=> Number)
  id?: number;

  @Expose({ name: "course_code" })
  courseCode?: string;

  @Expose()
  semester?: Semester;

  @Type(()=> Date)
  @Expose({ name: 'created_at' })
  createAt?: Date;

  @Expose()
  @Type(()=> Session)
  session?: Session;

}
