import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { updateUser, resetUser } from './user.action';
import { selectUser } from './user.selectors';
import { AsyncPipe, CommonModule } from '@angular/common';
@Component({
  selector: 'app-user',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  user$: Observable<any>;
  constructor(private store: Store) {
    this.user$ = this.store.select(selectUser);
  }
  updateUserData() {
    this.store.dispatch(
      updateUser({
        name: 'Kusuma',
        role: 'Angular'
      })
    );
  }
  resetUserData() {
    this.store.dispatch(resetUser());
  }
}
