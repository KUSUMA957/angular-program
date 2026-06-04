import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-cleanup-subscription',
  imports: [],
  templateUrl: './cleanup-subscription.html',
  styleUrl: './cleanup-subscription.css',
})
export class CleanupSubscription {
  count = 0;
  mySubscription!: Subscription;
  ngOnInit() {
    this.mySubscription = interval(1000).subscribe(value => {
      this.count = value;
      console.log('Timer running:', value);
    });
  }
  ngOnDestroy() {
    this.mySubscription.unsubscribe();
    console.log('Component destroyed - Subscription cleaned');
  }
}
