import { Injectable } from '@angular/core';

export interface SimpleUser {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private users: SimpleUser[] = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' }
  ];

  constructor() {
    console.log('UserService initialized');
  }

  getUsers(): SimpleUser[] {
    return this.users;
  }

  getUserCount(): number {
    return this.users.length;
  }

  addUser(name: string, email: string): void {
    const newUser: SimpleUser = { name, email };
    this.users.push(newUser);
  }

  clearAllUsers(): void {
    this.users = [];
  }
}
