import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdmissionForm } from './student-admission-form';

describe('StudentAdmissionForm', () => {
  let component: StudentAdmissionForm;
  let fixture: ComponentFixture<StudentAdmissionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAdmissionForm],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentAdmissionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
