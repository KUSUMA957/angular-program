import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, SimpleUser } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './simple-app.html'
})
export class AppComponent {
  userService = inject(UserService);
  
  userName = '';
  userEmail = '';

  addUser() {
    if (this.userName && this.userEmail) {
      this.userService.addUser(this.userName, this.userEmail);
      this.userName = '';
      this.userEmail = '';
    }
  }

  clearUsers() {
    this.userService.clearAllUsers();
  }
}
