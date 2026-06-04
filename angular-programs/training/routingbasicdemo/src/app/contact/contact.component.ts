import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="page-container">
      <div class="contact-header">
        <h1>Get in Touch</h1>
        <p class="subtitle">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div class="contact-content">
        <div class="contact-info">
          <h2>Contact Information</h2>
          
          <div class="info-item">
            <div class="info-icon">📍</div>
            <div class="info-details">
              <h3>Address</h3>
              <p>123 Tech Street<br>
                 Innovation District<br>
                 San Francisco, CA 94107</p>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">📞</div>
            <div class="info-details">
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">✉️</div>
            <div class="info-details">
              <h3>Email</h3>
              <p>info@capgeminisolutions.com</p>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">🕒</div>
            <div class="info-details">
              <h3>Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM<br>
                 Saturday: 10:00 AM - 4:00 PM<br>
                 Sunday: Closed</p>
            </div>
          </div>

          <div class="social-links">
            <h3>Follow Us</h3>
            <div class="social-icons">
              <span class="social-icon">🐦</span>
              <span class="social-icon">💼</span>
              <span class="social-icon">📘</span>
              <span class="social-icon">📷</span>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <h2>Send us a Message</h2>
          <form (ngSubmit)="onSubmit()" #contactForm="ngForm">
            <div class="form-group">
              <label for="name">Full Name *</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                [(ngModel)]="formData.name" 
                required
                #nameField="ngModel"
                class="form-control"
                [class.error]="nameField.invalid && nameField.touched">
              <div class="error-message" *ngIf="nameField.invalid && nameField.touched">
                Name is required
              </div>
            </div>

            <div class="form-group">
              <label for="email">Email Address *</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                [(ngModel)]="formData.email" 
                required 
                email
                #emailField="ngModel"
                class="form-control"
                [class.error]="emailField.invalid && emailField.touched">
              <div class="error-message" *ngIf="emailField.invalid && emailField.touched">
                <span *ngIf="emailField.errors?.['required']">Email is required</span>
                <span *ngIf="emailField.errors?.['email']">Please enter a valid email</span>
              </div>
            </div>

            <div class="form-group">
              <label for="subject">Subject *</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                [(ngModel)]="formData.subject" 
                required
                #subjectField="ngModel"
                class="form-control"
                [class.error]="subjectField.invalid && subjectField.touched">
              <div class="error-message" *ngIf="subjectField.invalid && subjectField.touched">
                Subject is required
              </div>
            </div>

            <div class="form-group">
              <label for="message">Message *</label>
              <textarea 
                id="message" 
                name="message" 
                [(ngModel)]="formData.message" 
                required
                #messageField="ngModel"
                rows="5"
                class="form-control"
                [class.error]="messageField.invalid && messageField.touched"
                placeholder="Tell us about your project or inquiry..."></textarea>
              <div class="error-message" *ngIf="messageField.invalid && messageField.touched">
                Message is required
              </div>
            </div>

            <button 
              type="submit" 
              class="submit-btn" 
              [disabled]="!contactForm.form.valid">
              {{isSubmitting ? 'Sending...' : 'Send Message'}}
            </button>
          </form>

          <div class="success-message" *ngIf="isSubmitted">
            <div class="success-icon">✅</div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .contact-header {
      text-align: center;
      margin-bottom: 4rem;
      padding: 3rem 0;
    }

    .contact-header h1 {
      font-size: 3rem;
      color: #333;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .subtitle {
      font-size: 1.2rem;
      color: #666;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 4rem;
    }

    .contact-info {
      background: white;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      height: fit-content;
    }

    .contact-info h2 {
      font-size: 2rem;
      color: #333;
      margin-bottom: 2rem;
    }

    .info-item {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      align-items: flex-start;
    }

    .info-icon {
      font-size: 1.5rem;
      min-width: 40px;
    }

    .info-details h3 {
      font-size: 1.2rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .info-details p {
      color: #666;
      line-height: 1.5;
    }

    .social-links {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #eee;
    }

    .social-links h3 {
      font-size: 1.2rem;
      color: #333;
      margin-bottom: 1rem;
    }

    .social-icons {
      display: flex;
      gap: 1rem;
    }

    .social-icon {
      font-size: 1.8rem;
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .social-icon:hover {
      transform: scale(1.2);
    }

    .contact-form {
      background: white;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .contact-form h2 {
      font-size: 2rem;
      color: #333;
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e1e5e9;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-control.error {
      border-color: #ff6b6b;
    }

    .error-message {
      color: #ff6b6b;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }

    textarea.form-control {
      resize: vertical;
      min-height: 120px;
    }

    .submit-btn {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .success-message {
      text-align: center;
      padding: 2rem;
      background: #f0f9f0;
      border-radius: 12px;
      margin-top: 2rem;
    }

    .success-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .success-message h3 {
      color: #28a745;
      margin-bottom: 0.5rem;
    }

    .success-message p {
      color: #666;
    }

    @media (max-width: 968px) {
      .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .contact-header h1 {
        font-size: 2rem;
      }
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  isSubmitted = false;

  onSubmit() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', this.formData);
      this.isSubmitting = false;
      this.isSubmitted = true;
      
      // Reset form after showing success message
      setTimeout(() => {
        this.resetForm();
      }, 3000);
    }, 2000);
  }

  private resetForm() {
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    this.isSubmitted = false;
  }
}
