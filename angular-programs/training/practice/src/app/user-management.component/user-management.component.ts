import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

type Role = 'Admin' | 'User';

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  roles: Role[] = ['Admin', 'User'];

  // Form model
  form = {
    name: '',
    email: '',
    role: 'User' as Role
  };

  // Users table data
  users: User[] = [];
  private seq = 1;

  // Add user to table
  add(formRef: NgForm) {
    if (formRef.invalid || this.emailExists) return;

    const user: User = {
      id: this.seq++,
      name: this.form.name.trim(),
      email: this.form.email.trim(),
      role: this.form.role
    };

    this.users.push(user);

    // Reset form, keep default role as 'User'
    formRef.resetForm({ name: '', email: '', role: 'User' });
  }

  // Delete user by id
  deleteUser(id: number) {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx > -1) this.users.splice(idx, 1);
  }

  // Optional: prevent duplicate emails
  get emailExists(): boolean {
    const e = this.form.email.trim().toLowerCase();
    return !!e && this.users.some(u => u.email.toLowerCase() === e);
  }

  // ✅ Proper trackBy function for *ngFor
  trackById = (_: number, item: User) => item.id;
}