import { Expose, Type } from "class-transformer";
import { Student } from "./Student";

export class Report {

  @Expose()
  @Type(()=> Number)
  id?: number;

  @Expose({ name: "record_url" })
  recordUrl?: string;

  @Expose()
  reply?: string;

  @Type(()=> Date)
  @Expose({ name: "created_at" })
  createdAt?: Date;

  @Type(()=> Student)
  @Expose()
  student?: Student;
}

