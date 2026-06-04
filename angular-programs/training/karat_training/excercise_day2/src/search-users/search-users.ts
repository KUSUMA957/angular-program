import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../services/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchUserPipe } from '../pipes/search-user-pipe';
@Component({
  selector: 'app-search-users',
  imports: [CommonModule, FormsModule, SearchUserPipe],
  templateUrl: './search-users.html',
  styleUrl: './search-users.css',
})
export class SearchUsers {
  users$: Observable<any[]>;
  searchText: string = '';
  constructor(private userService: User) {
    this.users$ = this.userService.getUsers();
  }
}
