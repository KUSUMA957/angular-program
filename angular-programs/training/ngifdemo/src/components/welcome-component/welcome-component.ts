import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-welcome-component',
  imports: [CommonModule],
  templateUrl: './welcome-component.html',
  styleUrl: './welcome-component.css',
})
export class WelcomeComponent {
 isLoggedIn: boolean = false;
  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }
}
