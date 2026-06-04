import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard-component',
  imports: [CommonModule],
  templateUrl: './user-dashboard-component.html',
  styleUrl: './user-dashboard-component.css',
})
export class UserDashboardComponent {
  users: string[] = ['Alice', 'Bob', 'Charlie'];
  addUser() {
    this.users.push('User ' + Math.random());
  }
  getCount() {
    console.log('getCount triggered');
    return this.users.length;
  }
}
