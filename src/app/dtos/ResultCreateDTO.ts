import { Expose, Type } from "class-transformer";
import { Semester } from "../models/Result";

export class ResultCreateDTO {

  @Expose({ name: "course_code" })
  courseCode?: string;

  @Expose()
  semester?: Semester;

  @Type(()=> Number)
  @Expose({ name: "session_id" })
  sessionId?: number;

}
