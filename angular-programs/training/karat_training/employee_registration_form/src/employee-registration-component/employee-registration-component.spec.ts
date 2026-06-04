import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRegistrationComponent } from './employee-registration-component';

describe('EmployeeRegistrationComponent', () => {
  let component: EmployeeRegistrationComponent;
  let fixture: ComponentFixture<EmployeeRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeRegistrationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeRegistrationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
