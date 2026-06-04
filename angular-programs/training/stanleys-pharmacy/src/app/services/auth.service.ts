import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<any>(null);

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.get<any[]>('http://localhost:3000/users?email=' + email + '&password=' + password);
  }

  signup(user: any) {
    return this.http.post('http://localhost:3000/users', user);
  }

  setUser(user: any) {
    this.currentUser.set(user);
  }

  logout() {
    this.currentUser.set(null);
  }
}