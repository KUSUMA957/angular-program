import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  // GET all posts
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.API_URL).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // GET posts by user ID using query parameters
  getPostsByUserId(userId: number): Observable<Post[]> {
    const params = new HttpParams().set('userId', userId.toString());
    
    return this.http.get<Post[]>(this.API_URL, { params }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // GET posts with multiple query parameters
  getPostsWithParams(userId?: number, limit?: number): Observable<Post[]> {
    let params = new HttpParams();
    
    if (userId) {
      params = params.set('userId', userId.toString());
    }
    
    if (limit) {
      params = params.set('_limit', limit.toString());
    }

    return this.http.get<Post[]>(this.API_URL, { params }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // Error handling method
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
      
      switch (error.status) {
        case 400:
          errorMessage = 'Bad Request: Invalid parameters';
          break;
        case 404:
          errorMessage = 'Not Found: Posts not found';
          break;
        case 500:
          errorMessage = 'Internal Server Error: Please try again later';
          break;
        case 0:
          errorMessage = 'Network Error: Please check your internet connection';
          break;
      }
    }

    console.error('HTTP Error:', errorMessage);
    return throwError(() => errorMessage);
  }
}
