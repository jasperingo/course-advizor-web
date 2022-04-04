import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentResultItemComponent } from './student-result-item.component';

describe('StudentResultItemComponent', () => {
  let component: StudentResultItemComponent;
  let fixture: ComponentFixture<StudentResultItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentResultItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentResultItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
