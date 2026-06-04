import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CounterComponent } from './counter.component';
import { firstValueFrom } from 'rxjs';

describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;
  let component: CounterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],     // ✅ Standalone components go into imports
      // declarations: []              // ❌ Do not declare standalone components
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
  });

  it('should have initial value 0 (class state)', () => {
    expect(component.count).toBe(0);
  });

  it('should render initial value 0 in the DOM', () => {
    fixture.detectChanges();
    const p: HTMLParagraphElement = fixture.nativeElement.querySelector('p');
    expect(p.textContent?.trim()).toBe('0');
  });

  it('should increment count when button is clicked (class state)', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    expect(component.count).toBe(1);
    button.triggerEventHandler('click', null);
    expect(component.count).toBe(2);
  });

  it('should update DOM after clicking the button', () => {
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();           // simulate user click
    fixture.detectChanges();  // update DOM
    const p: HTMLParagraphElement = fixture.nativeElement.querySelector('p');
    expect(p.textContent?.trim()).toBe('1');
  });

  it('getNumbers() should emit [1, 2, 3] (async/await)', async () => {
    const arr = await firstValueFrom(component.getNumbers());
    expect(arr).toEqual([1, 2, 3]);
  });

  // If you prefer Jasmine DoneFn instead of async/await:
  // it('getNumbers() should emit [1, 2, 3] (DoneFn)', (done: DoneFn) => {
  //   component.getNumbers().subscribe({
  //     next: (arr) => { expect(arr).toEqual([1, 2, 3]); done(); },
  //     error: (err) => done.fail(err),
  //   });
  // });
});


