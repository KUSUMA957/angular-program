import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-details',
  standalone: true,                 // <-- standalone
  imports: [CommonModule, FormsModule], // <-- add both
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent {
  student = { name: '', age: null as number | null, course: '' };
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }
}