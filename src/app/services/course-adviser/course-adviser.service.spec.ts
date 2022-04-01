import { TestBed } from '@angular/core/testing';

import { CourseAdviserService } from './course-adviser.service';

describe('CourseAdviserService', () => {
  let service: CourseAdviserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseAdviserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
