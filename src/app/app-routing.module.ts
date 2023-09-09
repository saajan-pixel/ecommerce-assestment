import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { OrderComponent } from './order/order.component';
import { OrderSuccessComponent } from './order-success/order-success.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'viewCart', component: ViewCartComponent },
  { path: 'order', component: OrderComponent },
  { path: 'orderSuccess', component: OrderSuccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
