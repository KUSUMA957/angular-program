import { Component } from '@angular/core';
import {
  CommonModule,
  UpperCasePipe,
  LowerCasePipe,
  DatePipe,
  JsonPipe,
  AsyncPipe,
} from '@angular/common';
import { Observable, interval, map } from 'rxjs';
import { NapipePipe } from '../app/pipes/napipe-pipe';

@Component({
  selector: 'app-pipe-demo',
  imports: [UpperCasePipe, LowerCasePipe, DatePipe, JsonPipe, NapipePipe, AsyncPipe, CommonModule],
  templateUrl: './pipe-demo.html',
  styleUrl: './pipe-demo.css',
})
export class PipeDemo {
  courseName: string = 'Angular Fundementals'
  date: Date = new Date()
  student: any=
  {
    name: 'Bejoy',
    age: 25,
    course: 'Angular',
    state: ''
  }
  currentTime :Observable<Date> = new Observable<Date>;
  constructor() {
this.currentTime = interval(1000).pipe(map(() => new Date()));
 
}
}