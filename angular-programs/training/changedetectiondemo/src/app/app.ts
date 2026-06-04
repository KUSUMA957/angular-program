import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultChangeDetectionComponent } from './default-change-detection.component';
import { OnPushChangeDetectionComponent } from './onpush-change-detection.component';
import { SignalsChangeDetectionComponent } from './signals-change-detection.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    DefaultChangeDetectionComponent,
    OnPushChangeDetectionComponent,
    SignalsChangeDetectionComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Angular Change Detection Demo');

  getAngularVersion(): string {
    return '20.3.0';
  }
}
