import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Databindingcomp } from './databindingcomp';

describe('Databindingcomp', () => {
  let component: Databindingcomp;
  let fixture: ComponentFixture<Databindingcomp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Databindingcomp],
    }).compileComponents();

    fixture = TestBed.createComponent(Databindingcomp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
