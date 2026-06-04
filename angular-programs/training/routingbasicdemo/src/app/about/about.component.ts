import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="page-container">
      <div class="about-header">
        <h1>About Capgemini Solutions</h1>
        <p class="subtitle">Building the future, one solution at a time</p>
      </div>

      <div class="content-sections">
        <section class="company-story">
          <div class="section-content">
            <div class="text-content">
              <h2>Our Story</h2>
              <p>
                Founded in 2010, Capgemini Solutions has been at the forefront of technological 
                innovation for over a decade. What started as a small team of passionate developers 
                has grown into a global company serving Fortune 500 clients worldwide.
              </p>
              <p>
                We believe that technology should empower businesses, not complicate them. 
                That's why we focus on creating solutions that are not only powerful but also 
                intuitive and user-friendly.
              </p>
            </div>
            <div class="image-placeholder">
              <div class="placeholder-icon">🏢</div>
              <p>Company Headquarters</p>
            </div>
          </div>
        </section>

        <section class="mission-vision">
          <div class="cards-container">
            <div class="card mission-card">
              <h3>🎯 Our Mission</h3>
              <p>
                To provide innovative technology solutions that help businesses streamline 
                their operations, increase efficiency, and achieve sustainable growth in 
                the digital marketplace.
              </p>
            </div>
            <div class="card vision-card">
              <h3>🔮 Our Vision</h3>
              <p>
                To be the world's most trusted technology partner, known for delivering 
                exceptional value and transforming the way businesses operate through 
                cutting-edge solutions.
              </p>
            </div>
          </div>
        </section>

        <section class="team-section">
          <h2>Meet Our Leadership</h2>
          <div class="team-grid">
            <div class="team-member">
              <div class="member-avatar">👨‍💼</div>
              <h4>John Smith</h4>
              <p class="role">CEO & Founder</p>
              <p class="bio">15+ years in tech leadership</p>
            </div>
            <div class="team-member">
              <div class="member-avatar">👩‍💻</div>
              <h4>Sarah Johnson</h4>
              <p class="role">CTO</p>
              <p class="bio">Expert in cloud architecture</p>
            </div>
            <div class="team-member">
              <div class="member-avatar">👨‍🎨</div>
              <h4>Mike Davis</h4>
              <p class="role">Head of Design</p>
              <p class="bio">Award-winning UX designer</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .about-header {
      text-align: center;
      margin-bottom: 4rem;
      padding: 3rem 0;
    }

    .about-header h1 {
      font-size: 3rem;
      color: #333;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .subtitle {
      font-size: 1.3rem;
      color: #666;
      font-style: italic;
    }

    .content-sections {
      display: flex;
      flex-direction: column;
      gap: 4rem;
    }

    .company-story {
      background: white;
      padding: 3rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .section-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
      align-items: center;
    }

    .text-content h2 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 1.5rem;
    }

    .text-content p {
      font-size: 1.1rem;
      line-height: 1.7;
      color: #555;
      margin-bottom: 1.5rem;
    }

    .image-placeholder {
      text-align: center;
      padding: 2rem;
      background: #f8f9fa;
      border-radius: 12px;
    }

    .placeholder-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .cards-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    .card {
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .mission-card {
      background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
      color: #333;
    }

    .vision-card {
      background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
      color: #333;
    }

    .card h3 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .card p {
      font-size: 1.1rem;
      line-height: 1.6;
    }

    .team-section h2 {
      text-align: center;
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 3rem;
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .team-member {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .team-member:hover {
      transform: translateY(-5px);
    }

    .member-avatar {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .team-member h4 {
      font-size: 1.3rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .role {
      font-weight: 600;
      color: #667eea;
      margin-bottom: 0.5rem;
    }

    .bio {
      color: #666;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .section-content {
        grid-template-columns: 1fr;
      }
      
      .cards-container {
        grid-template-columns: 1fr;
      }
      
      .about-header h1 {
        font-size: 2rem;
      }
    }
  `]
})
export class AboutComponent {}
