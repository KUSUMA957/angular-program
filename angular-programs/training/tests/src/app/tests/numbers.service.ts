import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Numbers } from './numbers.model';

@Injectable({
  providedIn: 'root'
})
export class NumbersService {

  constructor() {}

  getNumbers(): Observable<Numbers> {
    return of({ values: [1, 2, 3] });
  }
}