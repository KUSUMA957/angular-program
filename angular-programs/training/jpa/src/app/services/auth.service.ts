import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  register(user: any): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const exists = users.find((u: any) => u.email === user.email);
    if (exists) {
      return false;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }
}