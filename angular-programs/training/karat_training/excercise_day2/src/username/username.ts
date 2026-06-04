import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-username',
  imports: [CommonModule],
  templateUrl: './username.html',
  styleUrl: './username.css',
})
export class Username {
  usernames: string[] = [
    'Kusuma',
    'Teja',
    'Pallavi',
    'Keerthana'
  ];

}
