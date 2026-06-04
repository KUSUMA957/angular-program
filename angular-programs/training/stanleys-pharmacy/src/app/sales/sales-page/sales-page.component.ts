import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesService } from '../../services/sales.service';
import { ProductsService } from '../../services/products.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sales-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-page.component.html'
})
export class SalesPageComponent implements OnInit {
  sales = signal<any[]>([]);
  error = signal('');

  private salesSvc = inject(SalesService);
  private productsSvc = inject(ProductsService);
  private auth = inject(AuthService);

  ngOnInit() {
    this.loadSales();
  }

//   loadSales() {
//     const user = this.auth.currentUser();
//     console.log("Current user in sales page:", user);
//     if (!user) return;
// const userId = String(user.id);   // force string ALWAYS
// this.salesSvc.getSalesForUser(userId).subscribe(salesData => {
//     //this.salesSvc.getSalesForUser(String(user.id)).subscribe(salesData => {
//       this.productsSvc.getAll().subscribe(productsList => {

//         // const combined = salesData.map(sale => {
//         //   const product = productsList.find(p => String(p.id) === String(sale.productId));
//         //   //const product = productsList.find(p => p.id == sale.productId);  // IMPORTANT: use == not ===

//         //   return {
//         //     productName: product?.name || 'Unknown',
//         //     price: product?.price || 0,
//         //     date: new Date(sale.date).toLocaleString()
//         //   };
//         // });

//         // this.sales.set(combined);
//         const combined = salesData.map(sale => {
          
//   const product = productsList.find(
//     p => String(p.id) === String(sale.productId)
//   );


//   return {
//     productName: product?.name || 'Unknown',
//     price: product?.price || 0,
//     date: new Date(sale.date).toLocaleString()
//   };
// });

// this.sales.set(combined);
//       });
//     });
//   }
loadSales() {
  const user = this.auth.currentUser();
  console.log("Current user in sales page:", user);

  if (!user) return;

  const userId = String(user.id);

  this.salesSvc.getSalesForUser(userId).subscribe(salesData => {
    this.productsSvc.getAll().subscribe(productsList => {

      const combined = salesData.map(sale => {
        const product = productsList.find(
          p => String(p.id) === String(sale.productId)
        );

        return {
          productName: product?.name || 'Unknown',
          price: product?.price || 0,
          date: new Date(sale.date).toLocaleString()
        };
      });

      this.sales.set(combined);
    });
  });
}
}