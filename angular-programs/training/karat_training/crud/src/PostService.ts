import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  apiUrl = "https://jsonplaceholder.typicode.com/posts";
  constructor(private http: HttpClient) {}
  getPosts() {
    return this.http.get(this.apiUrl);
  }
  deletePost(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  createPost(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
