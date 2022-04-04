import { Expose, Type } from 'class-transformer';

export class Session {

  @Expose()
  @Type(()=> Number)
  id?: number;

  @Expose({ name: 'started_at' })
  startedAt?: number;

  @Expose({ name: 'ended_at' })
  endedAt?: number;

}
