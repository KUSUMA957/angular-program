import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../PostService';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-posts-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts-component.html',
  styleUrl: './posts-component.css',
})
export class PostsComponent {
  posts: any[] = [];
  constructor(private service: PostService) {}
  ngOnInit(): void{
    this.getPosts();
  }
  getPosts() {
    this.service.getPosts().subscribe((res: any) => {
      console.log("Response: ", res);
      this.posts = res;
    });
  }
  updatePost(post: any) {
    
  }
  
  addPost() {
    const newPost = {
      userId: 1,
      title: 'New Post Title',
      body: 'Post body content'
    };

    this.service.createPost(newPost).subscribe((res: any) => {
      console.log('Created:', res);
      this.posts.unshift(res); 
    });
  }
  
  deletePost(id: number) {
    this.service.deletePost(id).subscribe(() => {
      console.log('Deleted post id:', id);
      this.posts = this.posts.filter(p => p.id !== id);
    });
  }
}
