import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent, FormsModule, CommonModule],
  template: `
    <div class="parent-container">
      <h2>Parent Component Demo</h2>
      <div class="demo-section">
        <h3>Input/Output Demo</h3>
        <label for="nameInput">Enter a name: </label>
        <input 
          id="nameInput"
          type="text" 
          [(ngModel)]="childName" 
          placeholder="Enter name for child"
        />
        
        <app-child 
          [name]="childName" 
          (clicked)="onChildClicked($event)"
        ></app-child>
        
        <div class="feedback" *ngIf="clickCount > 0">
          <p>Child component has been clicked {{ clickCount }} time(s)!</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .parent-container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    
    .demo-section {
      background-color: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      margin-top: 20px;
    }
    
    h2 {
      color: #333;
      text-align: center;
    }
    
    h3 {
      color: #555;
      margin-bottom: 15px;
    }
    
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    
    input[type="text"] {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 15px;
      box-sizing: border-box;
    }
    
    .feedback {
      margin-top: 15px;
      padding: 10px;
      background-color: #e8f5e8;
      border: 1px solid #4caf50;
      border-radius: 4px;
    }
    
    .feedback p {
      color: #2e7d32;
      margin: 0;
      font-weight: bold;
    }
  `]
})
export class ParentComponent {
  childName: string = 'Default Name';
  clickCount: number = 0;

  onChildClicked(event: any) {
    this.clickCount++;
    console.log('Child component clicked!', event);
  }
}
