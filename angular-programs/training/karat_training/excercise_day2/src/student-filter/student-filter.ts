import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StudentMarksFilterPipe } from '../pipes/student-marks-filter-pipe';
@Component({
  selector: 'app-student-filter',
  imports: [CommonModule, StudentMarksFilterPipe],
  templateUrl: './student-filter.html',
  styleUrl: './student-filter.css',
})
export class StudentFilter {
  students = [
    { name: 'Kusuma', marks: 30 },
    { name: 'Preethi', marks: 82 },
    { name: 'Monisha', marks: 45 },
    { name: 'Pallavi', marks: 90 },
    { name: 'Keerthana', marks: 20 }
  ];
  // filteredStudents = this.students;
  // showPassed() {
  //   this.filteredStudents = this.students.filter(
  //     student => student.marks > 35
  //   );
  // }
  // showFailed() {
  //   this.filteredStudents = this.students.filter(
  //     student => student.marks < 35
  //   );
  // }
  // reset() {
  //   this.filteredStudents = this.students;
  // }
  filterType: 'passed' | 'failed' | '' = '';
}
