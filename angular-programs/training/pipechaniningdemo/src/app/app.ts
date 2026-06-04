import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimPipe } from './trim.pipe';

@Component({
  selector: 'app-root',
  imports: [CommonModule, TrimPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Sample data for pipe chaining demo
  protected readonly employees = signal([
    { name: 'john doe', salary: 75000, department: 'engineering', joinDate: new Date('2022-03-15') },
    { name: 'jane smith', salary: 85000, department: 'marketing', joinDate: new Date('2021-08-20') },
    { name: 'bob johnson', salary: 92000, department: 'engineering', joinDate: new Date('2020-11-10') },
    { name: 'alice brown', salary: 68000, department: 'hr', joinDate: new Date('2023-01-05') },
    { name: 'charlie davis', salary: 110000, department: 'sales', joinDate: new Date('2019-06-12') }
  ]);

  protected readonly price = signal(1234.567);
  protected readonly message = signal('  hello angular pipe chaining demo  ');
  protected readonly today = signal(new Date());
}
