import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Subject, of, delay, Subscription } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

// Simple reactive service demonstrating all patterns
class SimpleReactiveService {
  // 1. BehaviorSubject for authentication
  private authState = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.authState.asObservable();

  // 2. Subject for messaging
  private messageSource = new Subject<string>();
  message$ = this.messageSource.asObservable();

  // 3. Signal for counter
  counter = signal(0);

  // Methods
  login() {
    this.authState.next(true);
  }

  logout() {
    this.authState.next(false);
  }

  sendMessage(msg: string) {
    this.messageSource.next(msg);
  }

  incrementCounter() {
    this.counter.update(count => count + 1);
  }

  // Observable that we'll convert to signal
  getItems() {
    return of(['Item 1', 'Item 2', 'Item 3']).pipe(delay(1000));
  }
}

@Component({
  selector: 'app-simple-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [SimpleReactiveService],
  template: `
    <div class="demo-container">
      <h1>🚀 Angular Reactive Patterns Demo</h1>
      
      <!-- Authentication with BehaviorSubject -->
      <section class="section">
        <h2>🔐 Authentication (BehaviorSubject)</h2>
        <div class="auth-status">
          Status: <span [class]="isLoggedIn() ? 'logged-in' : 'logged-out'">
            {{ isLoggedIn() ? '✅ Logged In' : '❌ Logged Out' }}
          </span>
        </div>
        <button 
          (click)="isLoggedIn() ? service.logout() : service.login()" 
          class="btn">
          {{ isLoggedIn() ? 'Logout' : 'Login' }}
        </button>
      </section>

      <!-- Messaging with Subject -->
      <section class="section">
        <h2>💬 Messaging (Subject)</h2>
        <input 
          [(ngModel)]="message" 
          placeholder="Type a message..." 
          class="input">
        <button (click)="sendMessage()" [disabled]="!message()" class="btn">
          Send Message
        </button>
        <div class="messages">
          <div *ngFor="let msg of recentMessages(); trackBy: trackByIndex" class="message">
            {{ msg }}
          </div>
        </div>
      </section>

      <!-- Counter with Signals -->
      <section class="section">
        <h2>🔢 Counter (Signals)</h2>
        <div class="counter-display">
          Count: <span class="count">{{ service.counter() }}</span>
        </div>
        <div class="counter-info">
          Double: {{ doubleCount() }} | Is Even: {{ isEven() ? 'Yes' : 'No' }}
        </div>
        <button (click)="service.incrementCounter()" class="btn">
          Increment Counter
        </button>
      </section>

      <!-- Observable to Signal with toSignal -->
      <section class="section">
        <h2>🔄 Observable → Signal (toSignal)</h2>
        <div class="items-list">
          <h4>Items from Observable:</h4>
          <div *ngIf="items().length > 0; else loading">
            <div *ngFor="let item of items()" class="item">
              {{ item }}
            </div>
          </div>
          <ng-template #loading>
            <div class="loading">Loading items...</div>
          </ng-template>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }

    .section {
      background: white;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    h2 {
      color: #555;
      margin-bottom: 15px;
      border-bottom: 2px solid #007bff;
      padding-bottom: 5px;
    }

    .auth-status {
      margin: 15px 0;
      font-size: 18px;
      font-weight: bold;
    }

    .logged-in {
      color: green;
    }

    .logged-out {
      color: red;
    }

    .input {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-right: 10px;
      width: 200px;
    }

    .btn {
      padding: 10px 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }

    .btn:hover {
      background: #0056b3;
    }

    .btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .messages {
      margin-top: 15px;
      max-height: 150px;
      overflow-y: auto;
    }

    .message {
      background: #f8f9fa;
      padding: 8px;
      margin: 5px 0;
      border-left: 3px solid #007bff;
      border-radius: 0 4px 4px 0;
    }

    .counter-display {
      font-size: 24px;
      margin: 15px 0;
    }

    .count {
      font-weight: bold;
      color: #007bff;
    }

    .counter-info {
      margin: 10px 0;
      color: #666;
    }

    .items-list h4 {
      margin-bottom: 10px;
    }

    .item {
      padding: 8px;
      background: #e9ecef;
      margin: 5px 0;
      border-radius: 4px;
    }

    .loading {
      text-align: center;
      color: #666;
      font-style: italic;
      padding: 20px;
    }
  `]
})
export class SimpleDemoComponent implements OnInit, OnDestroy {
  protected service = inject(SimpleReactiveService);
  private subscription = new Subscription();

  // Regular signals
  message = signal('');
  recentMessages = signal<string[]>([]);

  // Computed signals
  doubleCount = computed(() => this.service.counter() * 2);
  isEven = computed(() => this.service.counter() % 2 === 0);

  // Convert auth Observable to Signal
  isLoggedIn = toSignal(this.service.isLoggedIn$, { initialValue: false });

  // Convert items Observable to Signal
  items = toSignal(this.service.getItems(), { initialValue: [] });

  ngOnInit() {
    // Subscribe to messages
    this.subscription.add(
      this.service.message$.subscribe(msg => {
        this.recentMessages.update(messages => [...messages.slice(-4), msg]);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  sendMessage() {
    if (this.message()) {
      this.service.sendMessage(this.message());
      this.message.set('');
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
