import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reactivecomponents } from './reactivecomponents';

describe('Reactivecomponents', () => {
  let component: Reactivecomponents;
  let fixture: ComponentFixture<Reactivecomponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reactivecomponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reactivecomponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
