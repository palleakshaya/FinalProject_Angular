import { Component } from '@angular/core';
import { IBook } from '../product.service';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  addOneProduct(item: IBook) {
    return this.productService.addProductP(item);
  }
  products: Array<IBook> = []; // Model -> View
  isLoading: boolean = true;
  msg = '';

  constructor(public productService: ProductService, private router: Router) {}

  // After Initialization of the component
  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService
      .getAllProducts()
      .then((data) => {
        this.products = data;
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
        this.msg = 'Something went wrong 🥲';
      });
  }
}
