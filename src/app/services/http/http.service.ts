import { HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export class CustomHttpParams extends HttpParams {

  public responseDataType: any;

  constructor(responseDataType: any, options: HttpParamsOptions = {}) {
    super(options);
    this.responseDataType = responseDataType;
  }
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getUrl(path: string) {
    return `${environment.apiUrl}${path}`
  }

  customParams(ResponseDataType: any) {
    return { params: new CustomHttpParams(ResponseDataType) };
  }

  get<T>(path: string, ResponseDataType: any) {
    return this.http.get<T>(this.getUrl(path), this.customParams(ResponseDataType));
  }

  post<T>(path: string, data: any, ResponseDataType: any) {
    return this.http.post<T>(this.getUrl(path), data, this.customParams(ResponseDataType));
  }
}
