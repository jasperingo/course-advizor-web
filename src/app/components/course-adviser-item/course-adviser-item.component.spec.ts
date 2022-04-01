import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAdviserItemComponent } from './course-adviser-item.component';

describe('CourseAdviserItemComponent', () => {
  let component: CourseAdviserItemComponent;
  let fixture: ComponentFixture<CourseAdviserItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseAdviserItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAdviserItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
