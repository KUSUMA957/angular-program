import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <div class="welcome-card">
        <h1>Welcome to Your Dashboard</h1>
        
        <div class="user-info" *ngIf="user$ | async as user">
          <div class="user-avatar">
            <span>{{ getInitials(user) }}</span>
          </div>
          <div class="user-details">
            <h2>{{ user.firstName }} {{ user.lastName }}</h2>
            <p class="email">{{ user.email }}</p>
            <p class="user-id">User ID: {{ user.id }}</p>
          </div>
        </div>

        <div class="dashboard-content">
          <div class="stats-grid">
            <div class="stat-card">
              <h3>Authentication Status</h3>
              <p class="status authenticated">✓ Authenticated</p>
            </div>
            
            <div class="stat-card">
              <h3>Session Info</h3>
              <p>Active since login</p>
              <small>Token-based authentication</small>
            </div>
            
            <div class="stat-card">
              <h3>RxJS State</h3>
              <p>Real-time reactive updates</p>
              <small>Observable-driven UI</small>
            </div>
          </div>

          <div class="actions">
            <button class="btn btn-secondary" (click)="refreshUserData()">
              Refresh Data
            </button>
            <button class="btn btn-danger" (click)="logout()">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 2rem;
    }

    .welcome-card {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 15px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .welcome-card h1 {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      margin: 0;
      padding: 2rem;
      text-align: center;
      font-size: 2rem;
      font-weight: 600;
    }

    .user-info {
      display: flex;
      align-items: center;
      padding: 2rem;
      border-bottom: 1px solid #eee;
    }

    .user-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      font-weight: 600;
      margin-right: 1.5rem;
    }

    .user-details h2 {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 1.5rem;
    }

    .email {
      color: #666;
      margin: 0 0 0.25rem 0;
      font-size: 1rem;
    }

    .user-id {
      color: #999;
      margin: 0;
      font-size: 0.875rem;
    }

    .dashboard-content {
      padding: 2rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 10px;
      border: 1px solid #e9ecef;
      text-align: center;
    }

    .stat-card h3 {
      margin: 0 0 1rem 0;
      color: #333;
      font-size: 1.1rem;
    }

    .stat-card p {
      margin: 0;
      color: #666;
      font-weight: 500;
    }

    .stat-card small {
      color: #999;
      font-size: 0.8rem;
    }

    .status.authenticated {
      color: #28a745;
      font-weight: 600;
    }

    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #5a6268;
      transform: translateY(-1px);
    }

    .btn-danger {
      background: #dc3545;
      color: white;
    }

    .btn-danger:hover {
      background: #c82333;
      transform: translateY(-1px);
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1rem;
      }

      .user-info {
        flex-direction: column;
        text-align: center;
      }

      .user-avatar {
        margin-right: 0;
        margin-bottom: 1rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .actions {
        flex-direction: column;
        align-items: center;
      }

      .btn {
        width: 200px;
      }
    }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  user$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
  }

  ngOnInit(): void {
    // Any initialization logic
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getInitials(user: User | null): string {
    if (!user) return '';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  }

  refreshUserData(): void {
    // In a real app, this might refresh user data from the server
    console.log('Refreshing user data...');
  }

  logout(): void {
    this.authService.logout();
  }
}
