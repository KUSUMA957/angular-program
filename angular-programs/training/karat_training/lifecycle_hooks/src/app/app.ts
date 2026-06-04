import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from '../employee/employee';
import { Parent } from '../parent/parent/parent';
import { CustomChangeDetection } from '../custom-change-detection/custom-change-detection';
import { CleanupSubscription } from '../cleanup-subscription/cleanup-subscription';
@Component({
  selector: 'app-root',
  imports: [Employee, Parent, CustomChangeDetection, CleanupSubscription],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('lifecycle_hooks');
}
