import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child-default',
  standalone: true,
  template: `
    <p>Child Counter (Default): {{ childCounter }}</p>
  `
})
export class ChildDefaultComponent {
  @Input() childCounter!: number;
}