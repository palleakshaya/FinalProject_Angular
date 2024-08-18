import { Component } from '@angular/core';
import { IBook } from '../product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CurrencyPipe } from '@angular/common';
// import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  everyProduct!: IBook;
  isLoading: boolean = true;
  msg = '';

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) // public cartService: CartService
  {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id') as string; // From URL
    this.productService
      .getProductsByid(id)
      .then((data) => {
        console.log(data);
        this.everyProduct = data;
        // this.isLoading = false;
        // this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        //   this.everyProduct.image
        // );
      })
      .catch(() => {
        this.isLoading = false;
        this.msg = 'Something went wrong';
      });
  }
  // addToCart() {
  //   this.cartService.addToCart(this.everyProduct);
  // }
  buyNow() {}
  // onBuyNow() {
  //   if (this.authService.isLoggedIn()) {
  //     // User is logged in, navigate to the orders page
  //     this.router.navigate(['/orders']);
  //   } else {
  //     // User is not logged in, navigate to the signup page
  //     this.router.navigate(['/signup']);
  //   }
}
