import { Component } from '@angular/core';
import { IBook } from '../product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CurrencyPipe } from '@angular/common';

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
  ) {}

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
  addToCart() {
    this.productService.addProductP(this.everyProduct);
  }
}
