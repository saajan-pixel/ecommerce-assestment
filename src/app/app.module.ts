import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ApiService } from './service/api.service';
import { ProductListComponent } from './product-list/product-list.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';

@NgModule({
  declarations: [AppComponent, NavbarComponent, ProductListComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    SliderModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
