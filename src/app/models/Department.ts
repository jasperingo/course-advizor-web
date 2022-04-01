import { Expose, Type } from 'class-transformer';

export class Department {

  @Expose()
  id?: number;

  @Expose()
  name?: string;

  @Expose()
  abbreviation?: string;

  @Expose({ name: 'created_at' })
  @Type(() => Date)
  createdAt?: Date;

}
