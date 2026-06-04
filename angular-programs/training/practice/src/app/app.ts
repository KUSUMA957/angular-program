import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentDetailsComponent } from './student-details.component/student-details.component';
import { UserRegistrationComponent } from './user-registration.component/user-registration.component';
import { EmployeeFormComponent } from './employee-form.component/employee-form.component';
import { StudentCourseRegistrationComponent } from './student-course-registration.component/student-course-registration.component';
import { LoginFormComponent } from './login-form.component/login-form.component';
import { ProductFormComponent } from './product-form.component/product-form.component';
import { PaymentFormComponent } from './payment-form.component/payment-form.component';
import { UserManagementComponent } from './user-management.component/user-management.component';
import { FeedbackFormComponent } from './feedback-form.component/feedback-form.component';

@Component({
  selector: 'app-root',
  imports: [StudentDetailsComponent,UserRegistrationComponent,EmployeeFormComponent,StudentCourseRegistrationComponent,LoginFormComponent,ProductFormComponent,PaymentFormComponent,UserManagementComponent,FeedbackFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('practice');
}
