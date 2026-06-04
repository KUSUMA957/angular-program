import { Routes } from '@angular/router';
import { StudentAdmissionForm } from '../student-admission-form/student-admission-form';
import { SuccessComponent } from '../success-component/success-component';

export const routes: Routes = [
  { path: '', component: StudentAdmissionForm },
  { path: 'success', component: SuccessComponent }
];