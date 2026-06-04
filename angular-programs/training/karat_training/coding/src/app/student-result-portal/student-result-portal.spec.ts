import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentResultPortal } from './student-result-portal';

describe('StudentResultPortal', () => {
  let component: StudentResultPortal;
  let fixture: ComponentFixture<StudentResultPortal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentResultPortal],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentResultPortal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
