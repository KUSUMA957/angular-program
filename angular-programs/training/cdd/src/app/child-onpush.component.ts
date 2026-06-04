import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-child-onpush',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>Child Counter (OnPush): {{ childCounter }}</p>
  `
})
export class ChildOnPushComponent {
  @Input() childCounter!: number;
}