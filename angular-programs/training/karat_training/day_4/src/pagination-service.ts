import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor(private http: HttpClient) {}
  getPosts(page: number, limit: number): Observable<any> {
    return this.http.get(`htps://jsonplaceholder.typicode.com/posts?page=${page}&limit=${limit}`);
  }
}
