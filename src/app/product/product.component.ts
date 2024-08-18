import { Component } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { IBook } from '../product.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
    CurrencyPipe,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  // @Input() product!: IBook;
  @Input() product: IBook = {
    bookId: '1',
    title: 'Indriyan',
    author: 'Sreenath Deshagani',
    price: 7.05,
    description:
      'This accelerated story narrative of Ajays search for his Unknown father has a blend of reality and fantasy, with a lot of twists and turns that makes your reading a rollercoaster ride.',
    rating: 5,
    category: 'Gothic Fiction',
    imageURL: 'https://m.media-amazon.com/images/I/5100TBriGTL.jpg',
    stock: 20,
    qty: 1,
  };

  @Input() bookId!: string;
  @Output() addItemEvent: EventEmitter<any> = new EventEmitter<any>();

  isLoading: boolean = true;
  msg = '';
  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  addToCart() {
    this.addItemEvent.emit(this.product);
  }
  cart() {
    this.productService.addProduct(this.product);
  }
}
