import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../services/search.service';
import { debounceTime, map } from 'rxjs/operators';
@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-filter.html',
  styleUrl: './search-filter.css',
})
export class SearchFilter {
  users = ['Kusuma', 'Teja', 'Hemanth', 'Neeha', 'Maha', 'Gowri'];
  filteredUsers: string[] = this.users; 
  constructor(private searchService: SearchService) {
    this.searchService.searchText$
      .pipe(
        debounceTime(500),  
        map(text => text.toLowerCase()) 
      )
      .subscribe(searchText => {
        this.filteredUsers = this.users.filter(user =>
          user.toLowerCase().includes(searchText)
        );
      });
  }
  onSearch(event: any) {
    this.searchService.searchText$.next(event.target.value);
  }
}