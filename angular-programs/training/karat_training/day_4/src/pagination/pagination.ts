import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  posts: any[] = [];
  pagedPosts: any[] = [];
  page = 1;
  limit = 20;
  totalRecords = 0;
  totalPages = 0;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.fetchPosts();
  }
  fetchPosts() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(data => {
        this.posts = data;
        this.totalRecords = data.length;
        this.totalPages = Math.ceil(this.totalRecords / this.limit);
        this.updatePageData();
      });
  }
  updatePageData() {
    const start = (this.page - 1) * this.limit;
    const end = start + this.limit;
    this.pagedPosts = this.posts.slice(start, end);
  }
  nextPage() {
    if(this.page < this.totalPages) {
      this.page++;
      this.updatePageData();
    }
  }
  prevPage() {
    if(this.page > 1) {
      this.page--;
      this.updatePageData();
    }
  }
}
