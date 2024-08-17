import { Component, Input } from '@angular/core';
import { IBook, ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  grandTotal: number = 0;
  removeFromCart(item: IBook) {
    this.productService.removeFromCart(item);
    this.calculateGrandTotal(); // Recalculate grand total after removal
  }

  @Input() allItems: Array<IBook> = [];
  constructor(public productService: ProductService, private router: Router) {
    this.allItems = productService.cart;
    this.calculateGrandTotal();
  }

  calculateGrandTotal() {
    this.grandTotal = this.allItems.reduce((total, item) => {
      return total + item.price * item.stock;
    }, 0);
  }

  total() {
    return;
  }

  ngOnInit() {
    this.loaditems();
  }

  loaditems() {
    this.router.navigate(['cart']);
  }

  placeOrder() {
    if (!this.validateOrder()) {
      alert(
        'One or more items exceed available stock. Please adjust your quantities.'
      ); // Alert user
      return; // Stop order placement
    }

    const orderDetails = {
      items: this.allItems,
      total: this.grandTotal,
      orderId: this.generateOrderId(),
      date: new Date().toLocaleString(),
    };

    this.productService
      .addOrder(orderDetails)
      .then((response) => {
        console.log('Order placed successfully:', response);
        this.productService.cart = []; // Clear cart after placing order
        this.calculateGrandTotal(); // Reset grand total
        this.router.navigate(['/orders'], { state: { orderDetails } });
      })
      .catch((error) => {
        console.error('Error placing order:', error);
      });
  }

  validateOrder(): boolean {
    for (const item of this.allItems) {
      if (item.qty > item.stock) {
        console.error(
          `Cannot place order. ${item.title} exceeds available stock.`
        );
        return false; // Validation failed
      }
    }
    return true; // Validation passed
  }

  id: number = 1;
  generateOrderId() {
    return (this.id += 1);
  }
}
