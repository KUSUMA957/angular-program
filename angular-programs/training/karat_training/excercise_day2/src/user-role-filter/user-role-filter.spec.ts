import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleFilter } from './user-role-filter';

describe('UserRoleFilter', () => {
  let component: UserRoleFilter;
  let fixture: ComponentFixture<UserRoleFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(UserRoleFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
