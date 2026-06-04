import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Child } from '../../child/child/child';
@Component({
  selector: 'app-parent',
  imports: [Child],
  templateUrl: './parent.html',
  styleUrl: './parent.css',
})
export class Parent {
  user = {
    name: 'Kusuma',
    age: 22
  };
  updateUser() {
    this.user = {
      name: 'Kusuma Mogadala',
      age: 22
    };
  }
  
//  parentMessage: string = '';
//   @ViewChild(Child)
//   childComponent!: Child;
//   ngAfterViewInit(): void {
//     this.parentMessage = this.childComponent.getChildData();
//     console.log('Child data accessed:', this.parentMessage);
//   }

}
