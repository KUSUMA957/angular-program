import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private user = {
    name: 'Kusuma',
    role: 'ADMIN'
  };
  isAdmin(): boolean {
    return this.user.role === 'ADMIN';
  }
}
