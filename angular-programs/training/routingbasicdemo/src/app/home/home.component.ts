import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="page-container">
      <div class="hero-section">
        <h1>Welcome to Capgemini Solutions</h1>
        <p class="hero-text">
          We are a leading technology company providing innovative solutions 
          to help businesses grow and succeed in the digital age.
        </p>
        <div class="cta-buttons">
          <button class="btn btn-primary">Get Started</button>
          <button class="btn btn-secondary">Learn More</button>
        </div>
      </div>
      
      <div class="features-section">
        <h2>Why Choose Us?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🚀</div>
            <h3>Innovation</h3>
            <p>Cutting-edge solutions tailored to your business needs</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Performance</h3>
            <p>Fast, reliable, and scalable technology solutions</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🛡️</div>
            <h3>Security</h3>
            <p>Enterprise-grade security for your peace of mind</p>
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

    .hero-section {
      text-align: center;
      padding: 4rem 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px;
      margin-bottom: 4rem;
    }

    .hero-section h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .hero-text {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.6;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #ff6b6b;
      color: white;
    }

    .btn-primary:hover {
      background: #ff5252;
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: transparent;
      color: white;
      border: 2px solid white;
    }

    .btn-secondary:hover {
      background: white;
      color: #667eea;
    }

    .features-section h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 3rem;
      color: #333;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .feature-card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #333;
    }

    .feature-card p {
      color: #666;
      line-height: 1.6;
    }
  `]
})
export class HomeComponent {}
