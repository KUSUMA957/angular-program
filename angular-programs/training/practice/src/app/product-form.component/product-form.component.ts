import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  product = {
    name: '',
    price: null as number | null,
    category: '',
    quantity: null as number | null
  };

  submittedView: {
    name: string;
    price: number | null;
    category: string;
    quantity: number | null;
  } | null = null;

  submit(form: NgForm) {
    if (form.invalid) return;
    // Capture plain-text view
    this.submittedView = {
      name: this.product.name,
      price: this.product.price,
      category: this.product.category,
      quantity: this.product.quantity
    };
  }

  // Requirement: reset form using form.reset()
  reset(form: NgForm) {
    form.reset(); // <-- exactly as asked
    this.submittedView = null;
  }
}