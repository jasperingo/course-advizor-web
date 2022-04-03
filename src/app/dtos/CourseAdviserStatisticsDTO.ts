import { Expose, Type } from "class-transformer";

export class CourseAdviserStatisticsDTO {

  @Type(()=> Number)
  @Expose({ name: 'number_of_students' })
  numberOfStudents?: number;

  @Type(()=> Number)
  @Expose({ name: 'number_of_results' })
  numberOfResults?: number;

  @Type(()=> Number)
  @Expose({ name: 'number_of_appointments' })
  numberOfAppointments?: number;

  @Type(()=> Number)
  @Expose({ name: 'number_of_reports' })
  numberOfReports?: number;

  @Type(()=> Number)
  @Expose({ name: 'number_of_pending_appointments' })
  numberOfPendingAppointments?: number;

  @Type(()=> Number)
  @Expose({ name: 'number_of_pending_reports' })
  numberOfPendingReports?: number;

}
