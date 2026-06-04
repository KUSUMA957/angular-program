import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

interface StoredUser {
  id: number;
  name: string;
  email: string;
  password: string; // plain text ONLY for demo
}

export function fakeBackendInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const { url, method, body } = req;

  // Intercept only our fake API
  if (!url.startsWith('/api/')) {
    return next(req);
  }

  return of(null).pipe(
    delay(500),
    mergeMap(() => {
      try {
        if (url.endsWith('/api/auth/register') && method === 'POST') {
          return handleRegister(body);
        }
        if (url.endsWith('/api/auth/login') && method === 'POST') {
          return handleLogin(body);
        }
        // Pass through unknown API routes
        return next(req);
      } catch (e: any) {
        return throwError(() => new HttpErrorResponse({
          status: 500,
          statusText: 'Server Error',
          error: { message: e?.message || 'Internal error' }
        }));
      }
    })
  );
}

// ===== Handlers =====
function handleRegister(body: any): Observable<HttpEvent<unknown>> {
  const users = getUsers();
  const { name, email, password } = body || {};

  if (!name || !email || !password) {
    return error('All fields are required.');
  }
  if (!isValidEmail(email)) {
    return error('Invalid email format.');
  }
  if ((password || '').length < 6) {
    return error('Password must be at least 6 characters.');
  }
  if (users.some(u => u.email.toLowerCase() === String(email).toLowerCase())) {
    return error('Email is already registered.');
  }

  const newUser: StoredUser = {
    id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name: String(name).trim(),
    email: String(email).toLowerCase().trim(),
    password
  };
  users.push(newUser);
  setUsers(users);

  return of(new HttpResponse({
    status: 201,
    body: { message: 'Registered successfully.' }
  }));
}

function handleLogin(body: any): Observable<HttpEvent<unknown>> {
  const users = getUsers();
  const { email, password } = body || {};

  if (!email || !password) {
    return error('Email and password are required.');
  }

  const user = users.find(u =>
    u.email.toLowerCase() === String(email).toLowerCase() && u.password === password
  );

  if (!user) {
    return error('Invalid email or password.', 401);
  }

  const { password: _, ...safeUser } = user;
  const token = 'fake-jwt-token.' + btoa(`${user.id}:${user.email}`);

  localStorage.setItem('currentUser', JSON.stringify({ ...safeUser, token }));

  return of(new HttpResponse({
    status: 200,
    body: { user: safeUser, token }
  }));
}

// ===== Helpers =====
function getUsers(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem('users') || '[]'); }
  catch { return []; }
}
function setUsers(users: StoredUser[]) {
  localStorage.setItem('users', JSON.stringify(users));
}
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}
function error(message: string, status = 400): Observable<never> {
  return throwError(() => new HttpErrorResponse({ status, statusText: 'Error', error: { message } }));
}