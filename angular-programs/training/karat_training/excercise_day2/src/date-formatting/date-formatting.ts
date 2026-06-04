import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-date-formatting',
  imports: [CommonModule],
  templateUrl: './date-formatting.html',
  styleUrl: './date-formatting.css',
})
export class DateFormatting {
  
  employees = [
    {
      name: 'Kusuma',
      joiningDate: new Date('2025-12-18T09:00:00')
    },
    {
      name: 'Pallavi',
      joiningDate: new Date('2015-01-10T14:45:00')
    }
  ];

}
