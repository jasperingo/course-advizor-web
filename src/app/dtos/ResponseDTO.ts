import { Expose } from 'class-transformer';

export enum Status {
  SUCCESS = 'SUCCESS', 
  ERROR = 'ERROR'
}

export class ResponseDTO<T> {

  @Expose()
  public status = Status.SUCCESS;

  @Expose()
  public message?: string;

  @Expose()
  public data?: T;

}
