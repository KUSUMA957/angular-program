import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyFormatting } from './currency-formatting';

describe('CurrencyFormatting', () => {
  let component: CurrencyFormatting;
  let fixture: ComponentFixture<CurrencyFormatting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyFormatting],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyFormatting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
