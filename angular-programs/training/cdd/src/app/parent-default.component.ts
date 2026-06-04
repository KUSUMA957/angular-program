import { Component } from '@angular/core';
import { ChildDefaultComponent } from './child-default.component';

@Component({
  selector: 'app-parent-default',
  standalone: true,
  imports: [ChildDefaultComponent],
  template: `
    <h2>Parent (Default Change Detection)</h2>

    <button (click)="incrementParent()">Increment Parent Counter</button>
    <p>Parent Counter: {{ parentCounter }}</p>

    <app-child-default [childCounter]="childCounter"></app-child-default>

    <button (click)="incrementChild()">Increment Child Counter</button>
  `
})
export class ParentDefaultComponent {
  parentCounter = 0;
  childCounter = 0;

  incrementParent() {
    this.parentCounter++;
  }

  incrementChild() {
    this.childCounter++;
  }
}
