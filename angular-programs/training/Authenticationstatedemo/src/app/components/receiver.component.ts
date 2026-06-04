import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-receiver',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="receiver-container">
      <h3>Message Receiver</h3>
      <div class="current-message" *ngIf="currentMessage()">
        <h4>Latest Message:</h4>
        <div class="message-display">{{ currentMessage() }}</div>
        <small>Received at: {{ lastMessageTime() }}</small>
      </div>
      
      <div class="message-history">
        <h4>Message History ({{ messageHistory().length }} messages):</h4>
        <div class="messages-list">
          <div 
            *ngFor="let msg of messageHistory(); trackBy: trackByIndex" 
            class="message-item">
            <span class="message-text">{{ msg.text }}</span>
            <small class="message-timestamp">{{ msg.timestamp }}</small>
          </div>
        </div>
        <button 
          *ngIf="messageHistory().length > 0" 
          (click)="clearHistory()"
          class="btn btn-secondary">
          Clear History
        </button>
      </div>
    </div>
  `,
  styles: [`
    .receiver-container {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin: 10px;
      max-width: 400px;
    }
    
    .current-message {
      margin-bottom: 20px;
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 6px;
    }
    
    .message-display {
      font-size: 18px;
      font-weight: bold;
      color: #007bff;
      margin: 10px 0;
    }
    
    .message-history {
      border-top: 1px solid #eee;
      padding-top: 15px;
    }
    
    .messages-list {
      max-height: 200px;
      overflow-y: auto;
      margin: 10px 0;
    }
    
    .message-item {
      padding: 8px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .message-text {
      font-weight: 500;
    }
    
    .message-timestamp {
      color: #666;
      font-size: 12px;
    }
    
    .btn {
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    
    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
    
    .btn:hover {
      opacity: 0.8;
    }
  `]
})
export class ReceiverComponent implements OnInit, OnDestroy {
  private messageService = inject(MessageService);
  private subscription = new Subscription();
  
  currentMessage = signal<string>('');
  lastMessageTime = signal<string>('');
  messageHistory = signal<Array<{text: string, timestamp: string}>>([]);

  ngOnInit() {
    this.subscription.add(
      this.messageService.message$.subscribe(msg => {
        console.log('Got:', msg);
        const timestamp = new Date().toLocaleTimeString();
        
        this.currentMessage.set(msg);
        this.lastMessageTime.set(timestamp);
        
        // Add to history
        this.messageHistory.update(history => [
          ...history,
          { text: msg, timestamp }
        ]);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  clearHistory() {
    this.messageHistory.set([]);
  }
  
  trackByIndex(index: number): number {
    return index;
  }
}
