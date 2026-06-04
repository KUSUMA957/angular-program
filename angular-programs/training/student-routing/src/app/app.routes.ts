// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { StudentsListComponent } from './students/students-list.component';
// import { StudentsAddComponent } from './students/students-add.component';
// import { StudentDetailsComponent } from './students/student-details.component';

// const routes: Routes = [
//   { path: 'students', component: StudentsListComponent },
//   { path: 'students/add', component: StudentsAddComponent },
//   { path: 'students/:id', component: StudentDetailsComponent },

//   // default redirect (optional)
//   { path: '', redirectTo: '/students', pathMatch: 'full' }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}


// app.routes.ts
import { Routes } from '@angular/router';
import { StudentsListComponent } from './students/students-list.component';
import { StudentsAddComponent } from './students/students-add.component';
import { StudentDetailsComponent } from './students/student-details.component';

export const routes: Routes = [
  { path: 'students', component: StudentsListComponent },
  { path: 'students/add', component: StudentsAddComponent },
  { path: 'students/:id', component: StudentDetailsComponent },

  { path: '', redirectTo: 'students', pathMatch: 'full' }
];