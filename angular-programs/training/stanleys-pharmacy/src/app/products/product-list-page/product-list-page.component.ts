import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { SalesService } from '../../services/sales.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list-page.component.html'
})
export class ProductListPageComponent implements OnInit {
  products = signal<any[]>([]);
  searchTerm = '';

  private productsSvc = inject(ProductsService);
  private salesSvc = inject(SalesService);
  private auth = inject(AuthService);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsSvc.getAll().subscribe(data => {
      this.products.set(data);
    });
  }

  search() {
    if (this.searchTerm.trim() === '') {
      return this.loadProducts();
    }

    this.productsSvc.search(this.searchTerm).subscribe(data => {
      this.products.set(data);
    });
  }

  purchase(product: any) {
    const user = this.auth.currentUser();
    if (!user) return;

    const sale = {
      // userId: user.id,
      // productId: product.id,
      userId: String(user.id),
productId: String(product.id),
      quantity: 1,
      date: new Date().toISOString()
    };

    this.salesSvc.createSale(sale).subscribe(() => {
      alert('Purchased!');
    });
  }
}