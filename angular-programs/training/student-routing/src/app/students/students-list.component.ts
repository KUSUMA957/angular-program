// // // students-list.component.ts
// // import { Component } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { RouterModule } from '@angular/router';

// // @Component({
// //   selector: 'app-students-list',
// //   standalone: true,
// //   imports: [CommonModule, RouterModule],
// //   templateUrl: './students-list.component.html'
// // })
// // export class StudentsListComponent {
// //   students = [
// //     { id: 1, name: 'Kiran' },
// //     { id: 2, name: 'Asha' },
// //     { id: 3, name: 'Rahul' }
// //   ];
// // }
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-students-list',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './students-list.component.html'
// })
// export class StudentsListComponent {
//   students = [
//     { id: 1, name: 'Kiran' },
//     { id: 2, name: 'Asha' },
//     { id: 3, name: 'Rahul' }
//   ];
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './students-list.component.html'
})
export class StudentsListComponent {

  
  students: { id: number, name: string }[] = [];
  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.students = this.studentService.getStudents();
  }
}
