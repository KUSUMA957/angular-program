import { Component, signal } from '@angular/core';
import { EmployeeRegistrationComponent } from '../employee-registration-component/employee-registration-component';
import { LoginComponent } from '../login-component/login-component';
import { StudentAdmissionForm } from '../student-admission-form/student-admission-form';
import { RouterOutlet } from '@angular/router';
import { JWTLoginComponent } from '../jwt_login_component';
import { ProfileComponent } from '../profile_component';
import { Employee } from '../employee/employee';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmployeeRegistrationComponent, LoginComponent, StudentAdmissionForm, JWTLoginComponent, ProfileComponent, Employee],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('employee_registration_form');
}
