import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAdviserStudentComponent } from './course-adviser-student.component';

describe('CourseAdviserStudentComponent', () => {
  let component: CourseAdviserStudentComponent;
  let fixture: ComponentFixture<CourseAdviserStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseAdviserStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAdviserStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
