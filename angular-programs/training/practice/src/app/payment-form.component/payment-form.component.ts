import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

type Method = 'Credit Card' | 'Debit Card' | 'UPI' | '';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent {
  methods: Method[] = ['Credit Card', 'Debit Card', 'UPI'];

  model: {
    method: Method;
    cardNumber: string;
    expiry: string;  // yyyy-MM (from <input type="month">)
    upiId: string;
  } = {
    method: '',
    cardNumber: '',
    expiry: '',
    upiId: ''
  };

  // Clear irrelevant fields when method changes
  onMethodChange() {
    if (this.model.method === 'UPI') {
      this.model.cardNumber = '';
      this.model.expiry = '';
    } else {
      this.model.upiId = '';
    }
  }

  submitted = false;

  submit(form: NgForm) {
    if (form.invalid) return;
    this.submitted = true;
  }

  reset(form: NgForm) {
    form.resetForm({
      method: '',
      cardNumber: '',
      expiry: '',
      upiId: ''
    });
    this.submitted = false;
  }
}