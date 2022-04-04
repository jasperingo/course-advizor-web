import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountResultComponent } from './account-result.component';

describe('AccountResultComponent', () => {
  let component: AccountResultComponent;
  let fixture: ComponentFixture<AccountResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
