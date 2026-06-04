import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  let component: ChildComponent;
  let fixture: ComponentFixture<ChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display message from parent', () => {
    component.message = 'Test message';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test message');
  });

  it('should display number from parent', () => {
    component.number = 42;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('42');
  });

  it('should display user data from parent', () => {
    component.user = { name: 'John Doe', age: 25 };
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('John Doe');
    expect(compiled.textContent).toContain('25');
  });
});
