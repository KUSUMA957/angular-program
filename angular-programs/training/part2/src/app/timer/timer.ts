import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, interval, switchMap, takeUntil, tap } from 'rxjs';
@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.html'
})
export class Timer {
  private start$ = new Subject<void>();
  private stop$ = new Subject<void>();
  private reset$ = new Subject<void>();
  private counterSubject = new BehaviorSubject<number>(0);
  timer$ = this.counterSubject.asObservable();
  constructor() {
    this.start$
      .pipe(
        switchMap(() =>
          interval(1000).pipe(
            tap(() => this.counterSubject.next(this.counterSubject.value + 1)),
            takeUntil(this.stop$),
            takeUntil(this.reset$)
          )
        )
      )
      .subscribe();
  }
  start() {
    this.start$.next();
  }
  stop() {
    this.stop$.next();
  }
  reset() {
    this.reset$.next();
    this.counterSubject.next(0);
  }
}