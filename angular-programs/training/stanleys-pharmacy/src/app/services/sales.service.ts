import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SalesService {
  constructor(private http: HttpClient) {}

  // getSalesForUser(userId: number) {
  //   return this.http.get<any[]>('http://localhost:3000/sales?userId=' + userId);
  // }
  getSalesForUser(userId: any) {
  return this.http.get<any[]>('http://localhost:3000/sales?userId=' + userId);
}
  createSale(sale: any) {
    return this.http.post('http://localhost:3000/sales', sale);
  }
  
  
}