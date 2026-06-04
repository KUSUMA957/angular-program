import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCartSystem } from './product-cart-system';

describe('ProductCartSystem', () => {
  let component: ProductCartSystem;
  let fixture: ComponentFixture<ProductCartSystem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCartSystem],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCartSystem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
