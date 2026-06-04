import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomChangeDetection } from './custom-change-detection';

describe('CustomChangeDetection', () => {
  let component: CustomChangeDetection;
  let fixture: ComponentFixture<CustomChangeDetection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomChangeDetection],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomChangeDetection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
