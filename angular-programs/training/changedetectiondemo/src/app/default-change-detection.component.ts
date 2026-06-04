import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-default-cd',
  standalone: true,
  imports: [FormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div class="component-card">
      <h2>Default Change Detection</h2>
      <p class="description">
        Uses Angular's default change detection strategy. 
        Change detection runs on every browser event.
      </p>
      
      <div class="input-group">
        <label for="default-input">Enter text:</label>
        <input 
          id="default-input"
          type="text" 
          [(ngModel)]="inputText" 
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
      
      <div class="info">
        <p><strong>How it works:</strong></p>
        <ul>
          <li>Every keystroke triggers change detection</li>
          <li>Check count increments on every change detection cycle</li>
          <li>Getter for uppercaseText is called every cycle</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .component-card {
      border: 2px solid #3f51b5;
      border-radius: 8px;
      padding: 20px;
      margin: 10px 0;
      background: #f5f5f5;
    }

    h2 {
      color: #3f51b5;
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
      border-color: #3f51b5;
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
      color: #3f51b5;
      font-weight: bold;
    }

    .counter {
      background: #ff9800;
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
      font-weight: bold;
    }

    .info {
      background: #e3f2fd;
      padding: 15px;
      border-radius: 4px;
      margin-top: 20px;
    }

    .info p {
      margin: 0 0 10px 0;
      color: #1976d2;
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
export class DefaultChangeDetectionComponent {
  inputText = '';
  private _checkCount = 0;

  get uppercaseText(): string {
    this._checkCount++;
    return this.inputText.toUpperCase();
  }

  get checkCount(): number {
    return this._checkCount;
  }
}
