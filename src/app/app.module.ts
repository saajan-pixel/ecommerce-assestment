import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ApiService } from './service/api.service';
import { ProductListComponent } from './product-list/product-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { SidebarModule } from 'primeng/sidebar';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ViewCartComponent } from './view-cart/view-cart.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { MessageService } from 'primeng/api';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaginatorModule } from 'primeng/paginator';
import { OrderComponent } from './order/order.component';
import { OrderSuccessComponent } from './order-success/order-success.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductListComponent,
    ProductDetailComponent,
    ViewCartComponent,
    OrderComponent,
    OrderSuccessComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    SliderModule,
    SidebarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RatingModule,
    TagModule,
    BadgeModule,
    ToastModule,
    NgxSpinnerModule,
    DividerModule,
    TableModule,
    PaginatorModule
  ],
  providers: [ApiService, MessageService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
