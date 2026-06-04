import { Component } from '@angular/core';

@Component({
  selector: 'app-student-result',
  imports: [],
  templateUrl: './student-result.html',
  styleUrl: './student-result.css',
})
export class StudentResult {
  students = [
  { name: 'Arun', marks: 85 },
  { name: 'Divya', marks: 45 },
  { name: 'Kiran', marks: 92 },
  { name: 'Meena', marks: 30 }
];
 isVisible: boolean = false;
  toggleElement() {
    this.isVisible = !this.isVisible;
  }
}
