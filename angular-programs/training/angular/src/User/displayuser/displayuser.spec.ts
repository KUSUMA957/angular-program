import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Displayuser } from './displayuser';

describe('Displayuser', () => {
  let component: Displayuser;
  let fixture: ComponentFixture<Displayuser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Displayuser],
    }).compileComponents();

    fixture = TestBed.createComponent(Displayuser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
