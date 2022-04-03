import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountStudentsComponent } from './account-students.component';

describe('AccountStudentsComponent', () => {
  let component: AccountStudentsComponent;
  let fixture: ComponentFixture<AccountStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
