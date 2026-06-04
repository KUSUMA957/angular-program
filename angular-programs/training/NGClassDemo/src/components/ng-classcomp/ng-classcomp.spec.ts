import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgClasscomp } from './ng-classcomp';

describe('NgClasscomp', () => {
  let component: NgClasscomp;
  let fixture: ComponentFixture<NgClasscomp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgClasscomp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgClasscomp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
