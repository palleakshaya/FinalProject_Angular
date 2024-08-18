import { Component, Input } from '@angular/core';
import { IBook, ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
// import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  grandTotal: number = 0;
  cartItems: IBook[] = [];

  @Input() allItems: Array<IBook> = [];
  constructor(
    public productService: ProductService,
    private router: Router // public cartService: CartService
  ) {
    this.allItems = productService.cart;
    this.calculateGrandTotal();
  }
  ngOnInit(): void {
    this.allItems = this.productService.gettingCart();
    // this.cartService.cartItems$.subscribe((items) => {
    //   this.cartItems = items;
    // });
  }

  calculateGrandTotal() {
    this.grandTotal = this.allItems.reduce((total, item) => {
      return this.cartItems.reduce(
        (total, item) => total + item.price * item.stock,
        0
      );
    }, 0);
  }

  total() {
    return;
  }
  removeFromCart(item: any) {
    const idx = this.allItems.indexOf(item);
    if (idx !== -1) {
      this.allItems.splice(idx, 1);
      this.productService.removeFromCart(item.id); // Ensure removal from service
      this.calculateGrandTotal(); // Recalculate total after removing item
    }
    // return
    // this.loaditems();
  }
  loaditems() {
    this.router.navigate(['cart']);
  }

  // ngOnInit() {
  //   this.loaditems();
  // }

  // loaditems() {
  //   this.router.navigate(['cart']);
  // }

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
  // deleteProduct() {
  //   this.productService.removeFromCart(id);
  //   this.allItems = this.productService.gettingCart();
  //   this.calculateGrandTotal();
  // }
  orders() {
    this.router.navigate([`orders`]);
  }
}
