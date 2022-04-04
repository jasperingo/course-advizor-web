import { Expose, Type } from "class-transformer";
import { Student } from "./Student";

export enum Status {
  PENDING = 'pending',
  DECLINED = 'pending', 
  ACCEPTED = 'accepted'
}

export class Appointment {

  @Expose()
  @Type(()=> Number)
  id?: number;

  @Expose()
  status?: Status;

  @Type(()=> Date)
  @Expose({ name: 'started_at' })
  startedAt?: Date;

  @Type(()=> Date)
  @Expose({ name: 'created_at' })
  createdAt?: Date;

  @Expose()
  @Type(()=> Student)
  student?: Student;

}