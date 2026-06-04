import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signals-cd',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="component-card">
      <h2>Signals-Based Change Detection</h2>
      <p class="description">
        Uses Angular Signals for reactive programming.
        Signals automatically track dependencies and update efficiently.
      </p>
      
      <div class="input-group">
        <label for="signals-input">Enter text:</label>
        <input 
          id="signals-input"
          type="text" 
          [value]="inputText()" 
          (input)="onInput($event)"
          placeholder="Type something..."
          class="text-input"
        />
      </div>
      
      <div class="output-section">
        <div class="output-item">
          <span class="label">Original:</span>
          <span class="value">{{ inputText() }}</span>
        </div>
        <div class="output-item">
          <span class="label">Uppercase:</span>
          <span class="value uppercase">{{ uppercaseText() }}</span>
        </div>
        <div class="output-item">
          <span class="label">Character count:</span>
          <span class="value counter">{{ charCount() }}</span>
        </div>
        <div class="output-item">
          <span class="label">Word count:</span>
          <span class="value counter">{{ wordCount() }}</span>
        </div>
        <div class="output-item">
          <span class="label">Computation count:</span>
          <span class="value counter">{{ computationCount() }}</span>
        </div>
      </div>
      
      <div class="button-group">
        <button (click)="toUpperCase()" class="btn">
          Force Uppercase
        </button>
        <button (click)="toLowerCase()" class="btn btn-secondary">
          Force Lowercase
        </button>
        <button (click)="clear()" class="btn btn-danger">
          Clear
        </button>
      </div>
      
      <div class="info">
        <p><strong>How it works:</strong></p>
        <ul>
          <li>Signals are reactive primitives introduced in Angular 16+</li>
          <li>Computed signals automatically derive from other signals</li>
          <li>Updates are granular - only affected components re-render</li>
          <li>No need for manual change detection or OnPush strategy</li>
          <li>Better performance and simpler mental model</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .component-card {
      border: 2px solid #ff5722;
      border-radius: 8px;
      padding: 20px;
      margin: 10px 0;
      background: #f5f5f5;
    }

    h2 {
      color: #ff5722;
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
      border-color: #ff5722;
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
      color: #ff5722;
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
      flex-wrap: wrap;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      background: #ff5722;
      color: white;
      font-weight: bold;
      transition: background 0.3s;
    }

    .btn:hover {
      background: #e64a19;
    }

    .btn-secondary {
      background: #757575;
    }

    .btn-secondary:hover {
      background: #616161;
    }

    .btn-danger {
      background: #f44336;
    }

    .btn-danger:hover {
      background: #d32f2f;
    }

    .info {
      background: #fbe9e7;
      padding: 15px;
      border-radius: 4px;
      margin-top: 20px;
    }

    .info p {
      margin: 0 0 10px 0;
      color: #d84315;
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
export class SignalsChangeDetectionComponent {
  // Signal for input text
  inputText = signal('');
  
  // Computed signal for uppercase transformation
  uppercaseText = computed(() => {
    this.incrementComputationCount();
    return this.inputText().toUpperCase();
  });

  // Computed signal for character count
  charCount = computed(() => this.inputText().length);

  // Computed signal for word count
  wordCount = computed(() => {
    const text = this.inputText().trim();
    return text ? text.split(/\s+/).length : 0;
  });

  // Track computation count
  private _computationCount = signal(0);
  computationCount = computed(() => this._computationCount());

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.inputText.set(input.value);
  }

  toUpperCase(): void {
    this.inputText.set(this.inputText().toUpperCase());
  }

  toLowerCase(): void {
    this.inputText.set(this.inputText().toLowerCase());
  }

  clear(): void {
    this.inputText.set('');
    this._computationCount.set(0);
  }

  private incrementComputationCount(): void {
    this._computationCount.update(count => count + 1);
  }
}
