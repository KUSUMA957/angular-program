import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-student-course-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-course-registration.component.html',
  styleUrls: ['./student-course-registration.component.css']
})
export class StudentCourseRegistrationComponent {
  courses = ['B.Tech', 'B.Sc', 'B.A', 'MCA', 'MBA'];
  subjectsList = ['Maths', 'Physics', 'Chemistry', 'Computer', 'English'];

  formData = {
    name: '',
    email: '',
    course: '',
    mode: 'Online',          // default
    subjects: [] as string[]
  };

  submittedView: {
    name: string;
    course: string;
    mode: string;
    subjects: string[];
  } | null = null;

  // Toggle subject checkbox → maintain array of selected subjects
  toggleSubject(sub: string, checked: boolean) {
    const i = this.formData.subjects.indexOf(sub);
    if (checked && i === -1) this.formData.subjects.push(sub);
    if (!checked && i !== -1) this.formData.subjects.splice(i, 1);
  }

  // Submit → capture only what we need for display (plain text)
  submit(form: NgForm) {
    if (form.invalid) return;
    this.submittedView = {
      name: this.formData.name,
      course: this.formData.course,
      mode: this.formData.mode,
      subjects: [...this.formData.subjects]
    };
  }

  // Reset form + clear submitted view
  reset(form: NgForm) {
    form.resetForm({
      name: '',
      email: '',
      course: '',
      mode: 'Online',
      subjects: []
    });
    this.submittedView = null;
  }
}