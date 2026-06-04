import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface student{
  name: string;
  marks: number;
  grade: string;
}
@Component({
  selector: 'app-student-result-portal',
  imports: [FormsModule, CommonModule],
  templateUrl: './student-result-portal.html',
  styleUrl: './student-result-portal.css',
})
export class StudentResultPortal {
  // students: student[] = [
  //   {name: "Kusuma", marks: 60},
  //   {name: "Teja", marks: 90},
  //   {name: "Maha", marks: 89},
  //   {name: "Hemu", marks: 56},
  //   {name: "Janaki Ram", marks: 21}
  // ];
  newStudent: student = {
    name: '',
    marks: 0,
    grade: ''
  };
  students: student[] = [];
  addStudent() {
    this.students.push({...this.newStudent});
    this.newStudent = { name: '', marks: 0, grade: ''};
  }
  calculateGrade() {
    for(let i = 0; i < this.students.length; i++) {
      if(this.students[i].marks > 80) {
        this.students[i].grade = 'A';
      } else if(this.students[i].marks > 60){
        this.students[i].grade = 'B';
      } else if(this.students[i].marks >= 35){
        this.students[i].grade = 'C';
      } else {
        this.students[i].grade = 'Fail';
      }
    }
  }

}
