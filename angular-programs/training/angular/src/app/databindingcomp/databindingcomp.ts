// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-databindingcomp',
//   imports: [],
//   templateUrl: './databindingcomp.html',
//   styleUrl: './databindingcomp.css',
// })
// export class Databindingcomp {}



import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-databindingcomp',
  imports: [FormsModule],
  templateUrl: './databindingcomp.html',
  styleUrl: './databindingcomp.css',
})
export class Databindingcomp {
  courseName: string = 'Angular 18';
  inputType = "checkbox";
  rollno: number = 101;
  isIndian: boolean = false;
  currentDate: Date = new Date();
 
  constructor() {
 
  }
 
  showAlert(message: string) {
    alert(message);
  }
 
  changeCourseName(newName: string) {
    this.courseName = newName;
  }
 
  // Method to toggle between Angular and React
  toggleCourse() {
    this.courseName = this.courseName === 'Angular 18' ? 'React 19' : 'Angular 18';
  }
 
  // Method to update course name from input
  updateCourseName(event: any) {
    this.courseName = event.target.value;
  }
}