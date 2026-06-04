import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-sender',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="sender-container">
      <h3>Message Sender</h3>
      <div class="message-form">
        <input 
          [(ngModel)]="message" 
          placeholder="Type your message..." 
          type="text"
          class="form-input"
          (keyup.enter)="send()">
        <button (click)="send()" [disabled]="!message()" class="btn btn-primary">
          Send Message
        </button>
      </div>
    </div>
  `,
  styles: [`
    .sender-container {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin: 10px;
      max-width: 400px;
    }
    
    .message-form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
    }
    
    .form-input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    
    .btn {
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      margin: 5px;
    }
    
    .btn-primary {
      background-color: #007bff;
      color: white;
    }
    
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .btn:hover:not(:disabled) {
      opacity: 0.8;
    }
  `]
})
export class SenderComponent {
  private messageService = inject(MessageService);
  
  message = signal('');

  send() {
    if (this.message()) {
      this.messageService.sendMessage(this.message());
      this.message.set('');
    }
  }
}
