import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  departments = ['Engineering', 'HR', 'Finance', 'Sales', 'Marketing', 'Support'];

  emp = {
    name: '',
    department: '',
    basic: null as number | null,
    bonus: null as number | null
  };

  total = 0;

  // Recalculate when basic or bonus changes
  recalc() {
    const b = Number(this.emp.basic) || 0;
    const p = Number(this.emp.bonus) || 0;
    this.total = b + (b * p) / 100;
  }

  // Optional: reset the form
  reset(form: NgForm) {
    form.resetForm({
      name: '',
      department: '',
      basic: null,
      bonus: null
    });
    this.total = 0;
  }
}