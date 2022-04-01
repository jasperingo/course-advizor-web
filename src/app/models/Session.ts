import { Expose } from 'class-transformer';

export class Session {

  @Expose()
  id?: number;

  @Expose({ name: 'started_at' })
  startedAt?: number;

  @Expose({ name: 'ended_at' })
  endedAt?: number;

}
