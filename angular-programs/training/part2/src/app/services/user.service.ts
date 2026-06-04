// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { User } from '../models/user.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private usersSubject = new BehaviorSubject<User[]>([]);
//   private nextId = 1;

//   getUsers(): Observable<User[]> {
//     return this.usersSubject.asObservable();
//   }

//   addUser(name: string): void {
//     const newUser: User = {
//       id: this.nextId++,   // numeric ID
//       name
//     };

//     const current = this.usersSubject.value;
//     this.usersSubject.next([...current, newUser]); // immutable update
//   }

//   removeUser(id: number): void {
//     const current = this.usersSubject.value;
//     const updated = current.filter(u => u.id !== id);
//     this.usersSubject.next(updated);
//   }
// }


import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private nextId = 1;

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  addUser(name: string): void {
    const newUser: User = { id: this.nextId++, name };
    this.usersSubject.next([...this.usersSubject.value, newUser]);
  }

  removeUser(id: number): void {
    this.usersSubject.next(
      this.usersSubject.value.filter(u => u.id !== id)
    );
  }
}