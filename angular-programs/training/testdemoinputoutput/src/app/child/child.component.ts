import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <div>
      <p>{{ name }}</p>
      <button (click)="onClick()">Click me</button>
    </div>
  `,
  styles: [`
    div {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      margin: 10px 0;
    }
    
    p {
      margin-bottom: 10px;
      font-weight: bold;
    }
    
    button {
      padding: 8px 16px;
      background-color: #007acc;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    button:hover {
      background-color: #005a9e;
    }
  `]
})
export class ChildComponent {
  @Input() name: string = '';
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
