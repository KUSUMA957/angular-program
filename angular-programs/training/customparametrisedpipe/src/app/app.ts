import { Component } from '@angular/core';
import { StudentComponent } from './components/student.component';

@Component({
  selector: 'app-root',
  imports: [StudentComponent],
  template: `
    <div class="container">
      <h1>Custom Parameterized Pipe Demo</h1>
      <app-student></app-student>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    
    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 30px;
    }
  `]
})
export class App {
}
