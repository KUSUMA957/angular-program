import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

interface Feedback {
  name: string;
  email: string;
  rating: number;
  message: string;
}

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent {
  // Form model
  feedback: Feedback = {
    name: '',
    email: '',
    rating: 5,
    message: ''
  };

  // Store all feedback
  allFeedback: Feedback[] = [];

  // Computed average rating
  get averageRating(): number {
    if (this.allFeedback.length === 0) return 0;
    const sum = this.allFeedback.reduce((acc, f) => acc + Number(f.rating || 0), 0);
    return +(sum / this.allFeedback.length).toFixed(2);
  }

  submit(form: NgForm) {
    if (form.invalid) return;
    // Push a copy to avoid binding side-effects
    this.allFeedback.push({
      name: this.feedback.name.trim(),
      email: this.feedback.email.trim(),
      rating: Number(this.feedback.rating),
      message: this.feedback.message.trim()
    });

    // Reset form with default rating back to 5
    form.resetForm({ name: '', email: '', rating: 5, message: '' });
  }

  reset(form: NgForm) {
    form.resetForm({ name: '', email: '', rating: 5, message: '' });
  }
}