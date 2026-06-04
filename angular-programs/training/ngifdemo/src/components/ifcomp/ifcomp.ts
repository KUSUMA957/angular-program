import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ifcomp',
  imports: [CommonModule],
  templateUrl: './ifcomp.html',
  styleUrl: './ifcomp.css',
})
export class Ifcomp {
  isVisible: boolean = false;
  selectedCity: string = '';

  cities: string[] = [
    'New York',
    'London',
    'Tokyo',
    'Paris',
    'Sydney',
    'Mumbai',
    'Dubai',
    'Singapore'
  ];

  enableElement() {
    this.isVisible = true;
  }

  disableElement() {
    this.isVisible = false;
  }

  toggleElement() {
    this.isVisible = !this.isVisible;
  }

  onCitySelect(event: any) {
    this.selectedCity = event.target.value;
  }
}
