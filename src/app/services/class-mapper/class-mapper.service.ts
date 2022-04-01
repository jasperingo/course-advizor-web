import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class ClassMapperService {

  static config = { excludeExtraneousValues: true };

  toInstance(Instance: any, plain: any) {
    return plainToInstance(Instance, plain, ClassMapperService.config) as any;
  }

}
