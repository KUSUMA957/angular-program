import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  posts = signal<Post[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  
  // Query parameters
  userId = 1;
  limit = 10;
  showLimitFilter = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPostsByUserId();
  }

  // Load all posts
  loadAllPosts(): void {
    this.loading.set(true);
    this.error.set(null);

    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts.set(posts);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(error);
        this.loading.set(false);
      }
    });
  }

  // Load posts by user ID using query parameters
  loadPostsByUserId(): void {
    if (this.userId < 1 || this.userId > 10) {
      this.error.set('User ID must be between 1 and 10');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.postService.getPostsByUserId(this.userId).subscribe({
      next: (posts) => {
        this.posts.set(posts);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(error);
        this.loading.set(false);
      }
    });
  }

  // Load posts with multiple query parameters
  loadPostsWithFilters(): void {
    if (this.userId < 1 || this.userId > 10) {
      this.error.set('User ID must be between 1 and 10');
      return;
    }

    if (this.limit < 1 || this.limit > 100) {
      this.error.set('Limit must be between 1 and 100');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const limitParam = this.showLimitFilter ? this.limit : undefined;

    this.postService.getPostsWithParams(this.userId, limitParam).subscribe({
      next: (posts) => {
        this.posts.set(posts);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(error);
        this.loading.set(false);
      }
    });
  }

  // Quick load for different users
  loadUserPosts(userId: number): void {
    this.userId = userId;
    this.loadPostsByUserId();
  }

  // Clear error
  clearError(): void {
    this.error.set(null);
  }

  // Toggle limit filter
  toggleLimitFilter(): void {
    this.showLimitFilter = !this.showLimitFilter;
  }

  // Get total word count for all posts
  getTotalWordCount(): number {
    return this.posts().reduce((total, post) => {
      const wordCount = post.body.split(' ').length + post.title.split(' ').length;
      return total + wordCount;
    }, 0);
  }

  // Get unique user IDs from current posts
  getUniqueUserIds(): number[] {
    const userIds = [...new Set(this.posts().map(post => post.userId))];
    return userIds.sort((a, b) => a - b);
  }

  // Track by function for ngFor optimization
  trackByPostId(index: number, post: Post): number {
    return post.id;
  }
}
