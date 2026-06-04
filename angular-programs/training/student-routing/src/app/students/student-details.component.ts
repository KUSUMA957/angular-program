// // // student-details.component.ts
// // import { Component } from '@angular/core';
// // import { ActivatedRoute } from '@angular/router';
// // import { CommonModule } from '@angular/common';
// // import { RouterModule } from '@angular/router';
// // @Component({
// //   selector: 'app-student-details',
// //   standalone: true,
// //   imports: [CommonModule, RouterModule],
// //   templateUrl: './student-details.component.html'
// // })
// // export class StudentDetailsComponent {

// //   studentId: any;

// //   constructor(private route: ActivatedRoute) {
// //     this.studentId = this.route.snapshot.paramMap.get('id');
// //   }
// // }

// import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-student-details',
//   standalone: true,
//   imports: [RouterModule],
//   templateUrl: './student-details.component.html'
// })
// export class StudentDetailsComponent {
//   studentId: any;

//   constructor(private route: ActivatedRoute) {
//     this.studentId = this.route.snapshot.paramMap.get('id');
//   }
// }

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-details.component.html'
})
export class StudentDetailsComponent {

  studentId: number = 0;
  student: any = null;

  constructor(private route: ActivatedRoute, private studentService: StudentService) {}

  ngOnInit() {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));

    const students = this.studentService.getStudents();

    // SIMPLE LOOP (as you asked)
    for (let s of students) {
      if (s.id === this.studentId) {
        this.student = s;
        break;
      }
    }
  }
}