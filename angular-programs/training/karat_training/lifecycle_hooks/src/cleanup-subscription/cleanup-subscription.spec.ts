import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanupSubscription } from './cleanup-subscription';

describe('CleanupSubscription', () => {
  let component: CleanupSubscription;
  let fixture: ComponentFixture<CleanupSubscription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CleanupSubscription],
    }).compileComponents();

    fixture = TestBed.createComponent(CleanupSubscription);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
