import { Injectable } from '@angular/core';
import { ClassTransformOptions, instanceToPlain, plainToInstance } from 'class-transformer';
import { map } from 'rxjs';
import { ResponseDTO } from 'src/app/dtos/ResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class ClassMapperService {

  static config: ClassTransformOptions  = { excludeExtraneousValues: true };

  responseToInstance(Instance: any) {
    return map((plain: any)=> {
      const response = this.toInstance(ResponseDTO, plain);
      
      if (plain.data) 
        response.data = this.toInstance(Instance, plain.data);

      return response;
    });
  }

  toInstance(Instance: any, plain: any) {
    return plainToInstance(Instance, plain, ClassMapperService.config) as any;
  }

  toPlain(object: any, Instance?: any) {
    if (Instance) {
      object = plainToInstance(Instance, object, { ...ClassMapperService.config, ignoreDecorators: true }) as any;
    }
    return instanceToPlain(object, ClassMapperService.config) as any;
  }

}
