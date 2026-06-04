import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true, // ✅ use standalone in Angular 18
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() name!: string;
  @Input() email!: string;
  @Input() avatar!: string;
}
