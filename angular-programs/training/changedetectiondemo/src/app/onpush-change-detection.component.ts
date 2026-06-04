import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onpush-cd',
  standalone: true,
  imports: [FormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="component-card">
      <h2>OnPush Change Detection</h2>
      <p class="description">
        Uses OnPush strategy. Change detection only runs when:
        @Input() changes, events fire, or manually marked for check.
      </p>
      
      <div class="input-group">
        <label for="onpush-input">Enter text:</label>
        <input 
          id="onpush-input"
          type="text" 
          [(ngModel)]="inputText" 
          (ngModelChange)="onTextChange()"
          placeholder="Type something..."
          class="text-input"
        />
      </div>
      
      <div class="output-section">
        <div class="output-item">
          <span class="label">Original:</span>
          <span class="value">{{ inputText }}</span>
        </div>
        <div class="output-item">
          <span class="label">Uppercase:</span>
          <span class="value uppercase">{{ uppercaseText }}</span>
        </div>
        <div class="output-item">
          <span class="label">Check count:</span>
          <span class="value counter">{{ checkCount }}</span>
        </div>
      </div>
      
      <div class="button-group">
        <button (click)="manualUpdate()" class="btn">
          Manual Update
        </button>
        <button (click)="resetCounter()" class="btn btn-secondary">
          Reset Counter
        </button>
      </div>
      
      <div class="info">
        <p><strong>How it works:</strong></p>
        <ul>
          <li>OnPush optimizes by reducing unnecessary checks</li>
          <li>We manually trigger detectChanges() on input change</li>
          <li>Check count is lower than Default strategy</li>
          <li>Better performance for complex components</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .component-card {
      border: 2px solid #4caf50;
      border-radius: 8px;
      padding: 20px;
      margin: 10px 0;
      background: #f5f5f5;
    }

    h2 {
      color: #4caf50;
      margin-top: 0;
    }

    .description {
      color: #666;
      font-style: italic;
      margin-bottom: 20px;
    }

    .input-group {
      margin: 20px 0;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
      color: #333;
    }

    .text-input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }

    .text-input:focus {
      outline: none;
      border-color: #4caf50;
    }

    .output-section {
      background: white;
      padding: 15px;
      border-radius: 4px;
      margin: 20px 0;
    }

    .output-item {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid #eee;
    }

    .output-item:last-child {
      border-bottom: none;
    }

    .label {
      font-weight: bold;
      color: #555;
    }

    .value {
      color: #333;
      font-family: monospace;
    }

    .uppercase {
      color: #4caf50;
      font-weight: bold;
    }

    .counter {
      background: #ff9800;
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
      font-weight: bold;
    }

    .button-group {
      display: flex;
      gap: 10px;
      margin: 20px 0;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      background: #4caf50;
      color: white;
      font-weight: bold;
      transition: background 0.3s;
    }

    .btn:hover {
      background: #45a049;
    }

    .btn-secondary {
      background: #757575;
    }

    .btn-secondary:hover {
      background: #616161;
    }

    .info {
      background: #e8f5e9;
      padding: 15px;
      border-radius: 4px;
      margin-top: 20px;
    }

    .info p {
      margin: 0 0 10px 0;
      color: #2e7d32;
    }

    .info ul {
      margin: 0;
      padding-left: 20px;
      color: #333;
    }

    .info li {
      margin: 5px 0;
    }
  `]
})
export class OnPushChangeDetectionComponent {
  inputText = '';
  uppercaseText = '';
  private _checkCount = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  onTextChange(): void {
    this._checkCount++;
    this.uppercaseText = this.inputText.toUpperCase();
    this.cdr.detectChanges();
  }

  manualUpdate(): void {
    this._checkCount++;
    this.uppercaseText = this.inputText.toUpperCase();
    this.cdr.markForCheck();
  }

  resetCounter(): void {
    this._checkCount = 0;
    this.cdr.markForCheck();
  }

  get checkCount(): number {
    return this._checkCount;
  }
}
