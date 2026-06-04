import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

type Gender = 'Male' | 'Female' | 'Other';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  // Dropdown data
  countries = ['India', 'USA', 'UK', 'Germany', 'Japan', 'Australia', 'Canada'];
  // Checkbox list
  skillsList = ['Angular', 'React', 'Node', 'Java', 'Python', 'SQL'];

  // Form model
  user = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    gender: '' as '' | Gender,
    skills: [] as string[],
    country: ''
  };

  showData = false;

  // Checkbox helper
  toggleSkill(skill: string, checked: boolean) {
    const i = this.user.skills.indexOf(skill);
    if (checked && i === -1) this.user.skills.push(skill);
    if (!checked && i !== -1) this.user.skills.splice(i, 1);
  }

  // Confirm password check
  get passwordMismatch(): boolean {
    return !!this.user.confirm && this.user.password !== this.user.confirm;
  }

  submit(form: NgForm) {
    if (form.invalid || this.passwordMismatch) return;
    this.showData = true;
  }

  reset(form: NgForm) {
    form.resetForm({
      name: '',
      email: '',
      password: '',
      confirm: '',
      gender: '',
      skills: [],
      country: ''
    });
    this.showData = false;
  }
}