import { Component } from '@angular/core';
import { UsernameFormatPipe } from '../pipes/username-format-pipe';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-profile',
  imports: [UsernameFormatPipe, CommonModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {
   username = 'aryan';
}
