import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, tap, catchError, delay } from 'rxjs/operators';
import { User, LoginRequest, RegisterRequest, AuthState } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'currentUser';
  private readonly registeredUsersKey = 'registeredUsers';
  
  // Initial state
  private initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  };

  // BehaviorSubject to manage authentication state
  private authStateSubject = new BehaviorSubject<AuthState>(this.initialState);
  
  // Public observables for components to subscribe to
  public authState$ = this.authStateSubject.asObservable();
  public user$ = this.authState$.pipe(map(state => state.user));
  public isAuthenticated$ = this.authState$.pipe(map(state => state.isAuthenticated));
  public isLoading$ = this.authState$.pipe(map(state => state.isLoading));
  public error$ = this.authState$.pipe(map(state => state.error));

  constructor() {
    // Check for existing user in localStorage on service initialization
    this.checkStoredUser();
  }

  private checkStoredUser(): void {
    const storedUser = localStorage.getItem(this.storageKey);
    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        this.updateState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } catch (error) {
        localStorage.removeItem(this.storageKey);
      }
    }
  }

  private updateState(newState: Partial<AuthState>): void {
    const currentState = this.authStateSubject.value;
    this.authStateSubject.next({ ...currentState, ...newState });
  }

  // Simulate API call for login
  login(credentials: LoginRequest): Observable<User> {
    this.updateState({ isLoading: true, error: null });

    // Simulate API delay
    return of(null).pipe(
      delay(1000),
      map(() => {
        // Check registered users first
        const registeredUsers = this.getRegisteredUsers();
        const registeredUser = registeredUsers.find(
          u => u.email === credentials.email && u.password === credentials.password
        );

        if (registeredUser) {
          const user: User = {
            id: registeredUser.id,
            email: registeredUser.email,
            firstName: registeredUser.firstName,
            lastName: registeredUser.lastName,
            token: 'fake-jwt-token-' + Math.random()
          };
          return user;
        }
        
        // Fallback to demo account
        if (credentials.email === 'user@example.com' && credentials.password === 'password') {
          const user: User = {
            id: 1,
            email: credentials.email,
            firstName: 'John',
            lastName: 'Doe',
            token: 'fake-jwt-token-' + Math.random()
          };
          return user;
        }
        
        throw new Error('Invalid email or password');
      }),
      tap(user => {
        // Store user in localStorage
        localStorage.setItem(this.storageKey, JSON.stringify(user));
        
        // Update state
        this.updateState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      }),
      catchError(error => {
        this.updateState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: error.message
        });
        return throwError(() => error);
      })
    );
  }

  // Simulate API call for registration
  register(userData: RegisterRequest): Observable<User> {
    this.updateState({ isLoading: true, error: null });

    return of(null).pipe(
      delay(1000),
      map(() => {
        // Check if email already exists
        const registeredUsers = this.getRegisteredUsers();
        if (registeredUsers.some(u => u.email === userData.email)) {
          throw new Error('Email already registered');
        }

        // Simulate registration logic
        const newUser = {
          id: Math.floor(Math.random() * 1000),
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          password: userData.password
        };

        // Save to registered users
        registeredUsers.push(newUser);
        localStorage.setItem(this.registeredUsersKey, JSON.stringify(registeredUsers));

        const user: User = {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          token: 'fake-jwt-token-' + Math.random()
        };
        return user;
      }),
      tap(user => {
        // Store user in localStorage
        localStorage.setItem(this.storageKey, JSON.stringify(user));
        
        // Update state
        this.updateState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      }),
      catchError(error => {
        this.updateState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: error.message || 'Registration failed'
        });
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    // Clear localStorage
    localStorage.removeItem(this.storageKey);
    
    // Reset state
    this.updateState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  }

  // Clear any authentication errors
  clearError(): void {
    this.updateState({ error: null });
  }

  // Get current user synchronously
  getCurrentUser(): User | null {
    return this.authStateSubject.value.user;
  }

  // Check if user is authenticated synchronously
  isAuthenticated(): boolean {
    return this.authStateSubject.value.isAuthenticated;
  }

  // Get registered users from localStorage
  private getRegisteredUsers(): Array<{id: number, email: string, firstName: string, lastName: string, password: string}> {
    const stored = localStorage.getItem(this.registeredUsersKey);
    return stored ? JSON.parse(stored) : [];
  }
}
