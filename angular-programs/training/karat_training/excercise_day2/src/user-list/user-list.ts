import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsernameFormatPipe } from '../pipes/username-format-pipe';
@Component({
  selector: 'app-user-list',
  imports: [CommonModule, UsernameFormatPipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  users = ['aryan', 'kusuma', 'Pallavi'];
}
