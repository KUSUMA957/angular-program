import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-practice',
  imports: [FormsModule],
  templateUrl: './practice.html',
  styleUrl: './practice.css',
})
export class Practice {
  
// 1) Display User Name Using Interpolation
  name: string = "Maya";

  // 2) Character Counter
  textValue: string = "Hello";

  // 3) Display Name, Email, Phone
  userName: string = "Kusuma";
  email: string = "kusuma@example.com";
  phone: string = "9876543210";

  // 4) Two numbers sum
  num1: number = 0;
  num2: number = 0;

  // 5) Even or Odd
  numberCheck: number = 0;

  // 6) Today's Date
  today: Date = new Date();
  
  num3: number = 10;
  num4: number = 20;


  //Day-2:
  students = ["Ram", "John", "Aisha", "Meena"];
  
employees = [
    { id: 1, name: 'Ram', salary: 50000 },
    { id: 2, name: 'John', salary: 60000 },
    { id: 3, name: 'Meena', salary: 45000 }, 
    { id: 4, name: 'Kusuma', salary: 75000 }
  ];
numbers = [1, 2, 3, 4, 5, 6, 7, 8];

 items = ['Item1', 'Item2', 'Item3'];
  selectedIndex: number | null = null;

  select(i: number) {
    this.selectedIndex = i;
    console.log('Selected index =', i);
  }

}
