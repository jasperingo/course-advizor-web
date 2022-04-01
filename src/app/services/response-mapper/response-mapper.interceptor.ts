import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { CustomHttpParams } from '../http/http.service';
import { ResponseDTO } from 'src/app/dtos/ResponseDTO';
import { ClassMapperService } from '../class-mapper/class-mapper.service';

@Injectable()
export class ResponseMapperInterceptor implements HttpInterceptor {

  constructor(private classMapper: ClassMapperService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          const customerParams = request.params as CustomHttpParams;
          const dto = this.classMapper.toInstance(ResponseDTO, event.body);
          dto.data = this.classMapper.toInstance(customerParams.responseDataType, event.body.data);
          return event.clone({ body: dto });
        } else {
          return event;
        }
      }),
      catchError((event)=> {
        if (event instanceof HttpErrorResponse)
          console.log('***************************');

        return throwError(() => event);
      })
    );
  }
}
