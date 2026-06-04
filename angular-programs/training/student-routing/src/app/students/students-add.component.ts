// // // students-add.component.ts
// // import { Component } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { RouterModule } from '@angular/router';
// // @Component({
// //   selector: 'app-students-add',
// //   standalone: true,
// //   imports: [CommonModule, RouterModule],
// //   templateUrl: './students-add.component.html'
// // })
// // export class StudentsAddComponent {
// //   studentName = '';
  
// //   saveStudent() {
// //     alert('Student Added: ' + this.studentName);
// //   }
// // }

// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-students-add',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './students-add.component.html'
// })
// export class StudentsAddComponent {
//   studentName = '';
//   saveStudent() {
//     alert('Student Added: ' + this.studentName);
//   }
// }
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './students-add.component.html'
})
export class StudentsAddComponent {

  studentName = '';

  constructor(private studentService: StudentService,
              private router: Router) {}

  saveStudent() {
    this.studentService.addStudent(this.studentName);

    // go back to list
    this.router.navigate(['/students']);
  }
}
