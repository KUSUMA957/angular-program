import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ 
  providedIn: 'root' 
})
export class CategoryService {
  // 🎯 THE SECRET WEAPON: BehaviorSubject
  // - Stores current state ('All' initially)
  // - Remembers the last emitted value
  // - Immediately gives current value to new subscribers
  // - Notifies ALL subscribers when value changes
  private selectedCategorySubject = new BehaviorSubject<string>('All');
  
  // 📡 PUBLIC OBSERVABLE STREAM
  // - Read-only access to the BehaviorSubject
  // - Components subscribe to this
  // - Automatically emits when selectedCategorySubject changes
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  // 🚀 STATE UPDATER
  // When ANY component calls this method:
  // 1. Updates the internal value
  // 2. Automatically broadcasts to ALL subscribers
  // 3. Every subscribed component reacts instantly!
  selectCategory(category: string) {
    console.log(`🔄 CategoryService: Broadcasting '${category}' to all subscribers`);
    this.selectedCategorySubject.next(category);
    // ⚡ Magic happens here - all components update automatically!
  }

  // 📖 CURRENT VALUE GETTER
  // Get current value without subscribing
  getCurrentCategory(): string {
    return this.selectedCategorySubject.value;
  }
}
