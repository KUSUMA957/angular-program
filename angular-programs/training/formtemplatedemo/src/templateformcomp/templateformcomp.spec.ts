import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Templateformcomp } from './templateformcomp';

describe('Templateformcomp', () => {
  let component: Templateformcomp;
  let fixture: ComponentFixture<Templateformcomp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Templateformcomp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Templateformcomp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
