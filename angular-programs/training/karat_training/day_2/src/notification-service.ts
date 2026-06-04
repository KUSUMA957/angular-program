import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  getNotifications(): Observable<string> {
    return new Observable(observer => {
      observer.next('Welcome user');
      setTimeout(() => {
        observer.next('Login successfull');
      }, 3000);
      setTimeout(() => {
        observer.next('Logout successfull');
      }, 6000);
    });
  }
}
