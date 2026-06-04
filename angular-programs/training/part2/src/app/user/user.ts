import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class UserListComponent {

  private userService = inject(UserService);

  users$!: Observable<User[]>; // <-- initially undefined
  userName = '';

  loadUsers() {
    this.users$ = this.userService.getUsers(); // <-- now list loads
  }

  addUser() {
    if (!this.userName.trim()) return;
    this.userService.addUser(this.userName);
    this.userName = '';
  }

  removeUser(id: number) {
    this.userService.removeUser(id);
  }
}