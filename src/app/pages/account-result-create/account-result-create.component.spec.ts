import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountResultCreateComponent } from './account-result-create.component';

describe('AccountResultCreateComponent', () => {
  let component: AccountResultCreateComponent;
  let fixture: ComponentFixture<AccountResultCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountResultCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountResultCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
