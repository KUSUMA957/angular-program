import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ifcomp } from './ifcomp';

describe('Ifcomp', () => {
  let component: Ifcomp;
  let fixture: ComponentFixture<Ifcomp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ifcomp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ifcomp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
