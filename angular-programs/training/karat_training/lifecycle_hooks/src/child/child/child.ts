import { Component, Input, OnChanges,  SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.css',
})
export class Child implements OnChanges{
  @Input() userData: any;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userData']) {
      const previousValue = changes['userData'].previousValue;
      const currentValue = changes['userData'].currentValue;
      console.log('Previous Value:', previousValue);
      console.log('Current Value:', currentValue);
    }
  }
  
 childMessage: string = 'Hello from Child Component';
  getChildData(): string {
    return this.childMessage;
  }
}
