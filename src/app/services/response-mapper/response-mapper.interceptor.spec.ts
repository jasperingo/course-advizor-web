import { TestBed } from '@angular/core/testing';

import { ResponseMapperInterceptor } from './response-mapper.interceptor';

describe('ResponseMapperInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ResponseMapperInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ResponseMapperInterceptor = TestBed.inject(ResponseMapperInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
