import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFormatting } from './date-formatting';

describe('DateFormatting', () => {
  let component: DateFormatting;
  let fixture: ComponentFixture<DateFormatting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateFormatting],
    }).compileComponents();

    fixture = TestBed.createComponent(DateFormatting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
