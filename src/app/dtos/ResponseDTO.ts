import { Expose } from 'class-transformer';

export enum Status {
  SUCCESS = 'SUCCESS', 
  ERROR = 'ERROR'
}

export class ResponseDTO<T> {

  @Expose()
  public status?: Status;

  @Expose()
  public message?: string;

  @Expose()
  public data!: T;

}
