import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <div class="child-container">
      <h3>Child Component</h3>
      <button (click)="sendMessage()" class="send-btn">Send Message to Parent</button>
      <button (click)="sendNumber()" class="send-btn">Send Number to Parent</button>
      <button (click)="sendObject()" class="send-btn">Send Object to Parent</button>
      <button (click)="sendName()" class="send-btn"> Send name To Parent</button>
    </div>
  `,
  styles: [`
    .child-container {
      border: 2px solid #4CAF50;
      border-radius: 8px;
      padding: 20px;
      margin: 20px;
      background-color: #f9f9f9;
    }
    
    .send-btn {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 10px 15px;
      margin: 5px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    
    .send-btn:hover {
      background-color: #45a049;
    }
    
    h3 {
      color: #333;
      margin-top: 0;
    }
  `]
})
export class ChildComponent {
  // Output decorator to emit string messages
  @Output() messageEvent = new EventEmitter<string>();
  
  // Output decorator to emit numbers
  @Output() numberEvent = new EventEmitter<number>();
  
  // Output decorator to emit objects
  @Output() objectEvent = new EventEmitter<{name: string, value: number}>();
  @Input() name: string = "Kusuma";
  @Output() nameSent = new EventEmitter<string>();
  sendName() {
    this.nameSent.emit(this.name);
  }
  sendMessage() {
    this.messageEvent.emit('Hi Parent! Message from Child Component 👋');
  }

  sendNumber() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    this.numberEvent.emit(randomNumber);
  }

  sendObject() {
    const dataObject = {
      name: 'Child Data',
      value: Date.now()
    };
    this.objectEvent.emit(dataObject);
  }
}
