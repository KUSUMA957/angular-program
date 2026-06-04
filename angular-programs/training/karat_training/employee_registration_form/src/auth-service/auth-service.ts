import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

export interface LoginResponse {
  token: string | null;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(username: string, password: string): Observable<LoginResponse> {
    if (username === 'kusuma' && password === 'kusuma') {
      return of({ token: 'FAKE_JWT_TOKEN_12345' });
    } else {
      return of({ token: null });
    }
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}