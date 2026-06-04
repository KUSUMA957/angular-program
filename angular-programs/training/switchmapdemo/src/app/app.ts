import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, Observable, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('switchmapdemo');
  
  // Search input and results
  searchQuery = '';
  searchResults = signal<string[]>([]);
  isLoading = signal(false);
  lastSearchTime = signal<string>('');
  
  // Subject to emit search queries
  private searchSubject = new Subject<string>();
  
  constructor() {
    // Set up the search pipeline with switchMap
    this.searchSubject.pipe(
      tap(() => {
        this.isLoading.set(true);
        this.lastSearchTime.set(new Date().toLocaleTimeString());
      }),
      debounceTime(300), // Wait 300ms after user stops typing
      distinctUntilChanged(), // Only emit if value is different from previous
      switchMap(query => this.getResults(query)) // Switch to new observable, canceling previous
    ).subscribe(results => {
      this.searchResults.set(results);
      this.isLoading.set(false);
    });
  }
  
  // Handle input changes
  onSearchInput(query: string): void {
    this.searchQuery = query;
    this.searchSubject.next(query);
  }
  
  // Fake API that returns results after 1 second
  private getResults(query: string): Observable<string[]> {
    console.log(`API called for query: "${query}" at ${new Date().toLocaleTimeString()}`);
    
    if (!query.trim()) {
      return of([]);
    }
    
    // Simulate API call with 1 second delay
    return new Observable<string[]>(observer => {
      const timeout = setTimeout(() => {
        // Fake search results
        const allItems = [
          'Apple', 'Angular', 'Application', 'Async',
          'Banana', 'Bootstrap', 'Backend', 'Browser',
          'Cherry', 'Component', 'CSS', 'Chrome',
          'Date', 'Directive', 'Database', 'Docker',
          'Electron', 'Express', 'ECMAScript',
          'Firebase', 'Frontend', 'Function',
          'Google', 'GitHub', 'GraphQL',
          'HTML', 'HTTP', 'Hook',
          'JavaScript', 'Java', 'JSON',
          'Kotlin', 'Kubernetes',
          'Linux', 'Library',
          'MongoDB', 'Module', 'Microservice',
          'Node.js', 'NPM', 'Next.js',
          'Observable', 'Operator', 'Object',
          'Python', 'PostgreSQL', 'Programming',
          'React', 'RxJS', 'Redux', 'Reactive',
          'Spring', 'SQL', 'Service', 'SwitchMap',
          'TypeScript', 'Testing', 'Template',
          'Ubuntu', 'URL',
          'Vue', 'Variable', 'VSCode',
          'Webpack', 'Web', 'WebSocket',
          'XML', 'XHR'
        ];
        
        const filtered = allItems.filter(item => 
          item.toLowerCase().includes(query.toLowerCase())
        );
        
        console.log(`API response for "${query}": ${filtered.length} results at ${new Date().toLocaleTimeString()}`);
        observer.next(filtered);
        observer.complete();
      }, 1000); // 1 second delay
      
      // Cleanup function - called when switchMap cancels the subscription
      return () => {
        clearTimeout(timeout);
        console.log(`API call cancelled for query: "${query}"`);
      };
    });
  }
}
