import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAdvisersComponent } from './course-advisers.component';

describe('CourseAdvisersComponent', () => {
  let component: CourseAdvisersComponent;
  let fixture: ComponentFixture<CourseAdvisersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseAdvisersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAdvisersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
