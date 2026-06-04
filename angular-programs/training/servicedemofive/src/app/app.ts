import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterService } from './counter.service';
import { UserService } from './user.service';
import { User } from './user.interface';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('servicedemofive');
  private counterService = inject(CounterService);
  private userService = inject(UserService);

  // Counter Service functionality
  get count(): number {
    return this.counterService.getCount();
  }

  increment(): void {
    this.counterService.increment();
  }

  decrement(): void {
    this.counterService.decrement();
  }

  // User Service functionality
  get users(): User[] {
    return this.userService.getUsers();
  }

  get adminUsers(): User[] {
    return this.userService.getUsersByRole('Admin');
  }

  get managerUsers(): User[] {
    return this.userService.getUsersByRole('Manager');
  }

  get regularUsers(): User[] {
    return this.userService.getUsersByRole('User');
  }

  addNewUser(): void {
    const newUser = {
      name: 'New User',
      email: 'newuser@example.com',
      role: 'User'
    };
    this.userService.addUser(newUser);
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId);
  }
}
