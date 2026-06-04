import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <a routerLink="/" class="brand-link">
            <span class="brand-icon">🔐</span>
            Auth Demo
          </a>
        </div>

        <div class="nav-menu">
          <div *ngIf="isAuthenticated$ | async; else unauthenticatedMenu">
            <div class="nav-user">
              <span class="user-greeting">Hello, {{ (user$ | async)?.firstName }}</span>
              <button class="btn btn-outline" (click)="logout()">
                Logout
              </button>
            </div>
          </div>

          <ng-template #unauthenticatedMenu>
            <div class="nav-links">
              <a routerLink="/login" class="nav-link" routerLinkActive="active">Login</a>
              <a routerLink="/register" class="nav-link" routerLinkActive="active">Register</a>
            </div>
          </ng-template>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
    }

    .nav-brand .brand-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #333;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .brand-icon {
      margin-right: 0.5rem;
      font-size: 1.5rem;
    }

    .nav-links {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .nav-link {
      text-decoration: none;
      color: #666;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: all 0.3s ease;
    }

    .nav-link:hover {
      color: #667eea;
      background: #f8f9ff;
    }

    .nav-link.active {
      color: #667eea;
      background: #f8f9ff;
    }

    .nav-user {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-greeting {
      color: #666;
      font-weight: 500;
    }

    .btn {
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
    }

    .btn-outline {
      background: transparent;
      border: 1px solid #667eea;
      color: #667eea;
    }

    .btn-outline:hover {
      background: #667eea;
      color: white;
    }

    @media (max-width: 768px) {
      .nav-container {
        padding: 0 0.5rem;
      }

      .nav-links {
        gap: 0.5rem;
      }

      .nav-link {
        padding: 0.5rem;
        font-size: 0.875rem;
      }

      .user-greeting {
        display: none;
      }
    }
  `]
})
export class NavbarComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  
  isAuthenticated$: Observable<boolean>;
  user$: Observable<User | null>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.user$ = this.authService.user$;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
