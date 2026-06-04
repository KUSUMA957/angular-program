import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Adduser } from '../User/adduser/adduser';
import { Displayuser } from '../User/displayuser/displayuser';
import { Databindingcomp } from './databindingcomp/databindingcomp';
import { Practice } from '../practice/practice';
import { StudentResult } from '../student-result/student-result';
import { ProductFilter } from '../product-filter/product-filter';
@Component({
  selector: 'app-root',
  imports: [Adduser, Displayuser, Databindingcomp, Practice, StudentResult, ProductFilter],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular');
}
