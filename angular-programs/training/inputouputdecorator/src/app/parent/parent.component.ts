import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent, JsonPipe],
  template: `
    <div class="parent-container">
      <h2>Parent Component</h2>
      
      <!-- Listen to all three events from child component -->
      <app-child 
        (messageEvent)="receiveMessage($event)"
        (numberEvent)="receiveNumber($event)"
        (objectEvent)="receiveObject($event)"
        (nameSent)="receiveNameFromChild($event)">
      </app-child>
      
      <div class="received-data">
        <h4>Data Received from Child:</h4>
        <div class="data-item">
          <strong>Message:</strong> 
          <span class="message">{{ receivedMessage || 'No message yet' }}</span>
        </div>
        <div class="data-item">
          <strong>Number:</strong> 
          <span class="number">{{ receivedNumber !== null ? receivedNumber : 'No number yet' }}</span>
        </div>
        <div class="data-item">
          <strong>Object:</strong> 
          <span class="object">{{ receivedObject ? (receivedObject | json) : 'No object yet' }}</span>
        </div>
        <div class="data-item">
          <strong>Received Name From Child:</strong> 
          <span class="message">{{ receivedName || 'No name yet' }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .parent-container {
      border: 2px solid #2196F3;
      border-radius: 8px;
      padding: 20px;
      margin: 20px;
      background-color: #f0f8ff;
    }
    
    .received-data {
      margin-top: 20px;
      padding: 15px;
      background-color: white;
      border-radius: 6px;
      border-left: 4px solid #2196F3;
    }
    
    .data-item {
      margin: 10px 0;
      padding: 8px;
      background-color: #f9f9f9;
      border-radius: 4px;
    }
    
    .message {
      color: #4CAF50;
      font-weight: bold;
    }
    
    .number {
      color: #FF9800;
      font-weight: bold;
    }
    
    .object {
      color: #9C27B0;
      font-weight: bold;
      font-family: monospace;
    }
    
    h2 {
      color: #2196F3;
      margin-top: 0;
    }
    
    h4 {
      color: #333;
      margin-bottom: 15px;
    }
  `]
})
export class ParentComponent {
  receivedMessage: string = '';
  receivedNumber: number | null = null;
  receivedObject: {name: string, value: number} | null = null;
  receivedName: string = '';
  receiveMessage(msg: string) {
    this.receivedMessage = msg;
    console.log('Received message from child:', msg);
  }
  receiveNameFromChild(name: string) {
    this.receivedName = name;
  }
  receiveNumber(num: number) {
    this.receivedNumber = num;
    console.log('Received number from child:', num);
  }

  receiveObject(obj: {name: string, value: number}) {
    this.receivedObject = obj;
    console.log('Received object from child:', obj);
  }
}
