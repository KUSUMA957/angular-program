import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <div>
      <h3>Child Component</h3>
      <p>Message from parent: {{ message }}</p>
      <p>Number from parent: {{ number }}</p>
      <p>User name: {{ user?.name }}</p>
      <p>User age: {{ user?.age }}</p>
    </div>
  `
})
export class ChildComponent {
  @Input() message: string = '';
  @Input() number: number = 0;
  @Input() user: { name: string; age: number } | null = null;
}
