import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthSignalService {
  isLoggedIn = signal(false);

  login(username: string, password: string) {
    console.log(`Signal-based login for user: ${username}`);
    this.isLoggedIn.set(true);
  }

  logout() {
    console.log('Signal-based logout');
    this.isLoggedIn.set(false);
  }
}
