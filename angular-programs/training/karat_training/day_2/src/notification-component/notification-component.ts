import { Component } from '@angular/core';
import { NotificationService } from '../notification-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-notification-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-component.html',
  styleUrl: './notification-component.css',
})
export class NotificationComponent {
  notifications: string[] = [];
  constructor(private notificationService: NotificationService) {}
  ngOnInit() {
    this.notificationService.getNotifications().subscribe(message => {
      console.log("Notifications: ", message);
      this.notifications.push(message);
    });
  }
}
