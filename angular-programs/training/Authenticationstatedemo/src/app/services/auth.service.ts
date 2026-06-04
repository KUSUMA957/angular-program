import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authState = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.authState.asObservable();

  login(username: string, password: string) {
    // Normally you'd make an HTTP call here
    console.log(`Logging in user: ${username}`);
    this.authState.next(true);
  }

  logout() {
    console.log('Logging out user');
    this.authState.next(false);
  }

  getCurrentAuthState(): boolean {
    return this.authState.value;
  }
}
