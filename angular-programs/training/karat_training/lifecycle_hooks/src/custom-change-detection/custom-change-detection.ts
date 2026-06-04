import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-change-detection',
  imports: [],
  templateUrl: './custom-change-detection.html',
  styleUrl: './custom-change-detection.css',
})
export class CustomChangeDetection {
  count = 0;
  ngDoCheck(): void {
    console.log('Change Detection Triggered');
  }
  increaseCount() {
    this.count++;
  }
}
