import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private messageSource = new Subject<string>();
  message$ = this.messageSource.asObservable();

  sendMessage(msg: string) {
    console.log(`Sending message: ${msg}`);
    this.messageSource.next(msg);
  }
}
