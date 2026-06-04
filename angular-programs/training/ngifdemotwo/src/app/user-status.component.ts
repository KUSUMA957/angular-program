import { Component, signal } from '@angular/core';

type UserStatus = 'loading' | 'active' | 'blocked' | 'error';

@Component({
  selector: 'app-user-status',
  standalone: true,
  templateUrl: './user-status.component.html',
  styleUrl: './user-status.component.css'
})
export class UserStatusComponent {
  status = signal<UserStatus>('loading');

  onRetry() {
    this.status.set('loading');
  }
}
