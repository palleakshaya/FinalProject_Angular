import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'product',
    children: [
      { path: '', component: ProductListComponent },
      {
        path: ':id',
        component: ProductDetailsComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },

  // {
  //   path: 'product-details',
  //   component: ProductDetailsComponent,
  // },
];
