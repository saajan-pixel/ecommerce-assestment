import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { finalize, first } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productDetail!: any;
  id!: number;
  rating = 0;
  quantity = 1;
  cartCount = 0;
  constructor(
    private _apiService: ApiService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.getAllCarts();
    this.getProductDetail();
  }

  getProductDetail() {
    this.spinner.show();
    this._apiService
      .getProductDetail(this.id)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      )
      .subscribe({
        next: (res) => {
          const discountedPrice = (
            res.price -
            (res.discountPercentage / 100) * res.price
          ).toFixed(0);
          this.productDetail = { ...res, discountedPrice };
          this.rating = Math.ceil(this.productDetail.rating);
        },
        error: (error: HttpErrorResponse) => {
          throw error;
        },
      });
  }

  getAllCarts() {
    this._apiService
      .getAllCartItems()
      .pipe(first())
      .subscribe((res) => {
        this.cartCount = res.length;
        const productDetail = res.filter((item: any) => item.id === this.id);
        this.quantity = productDetail[0]?.quantity
          ? productDetail[0]?.quantity
          : 1;
      });
  }

  addToCart() {
    const data = {
      userId: 1,
      id: this.productDetail.id,
      quantity: this.quantity,
      rating: this.productDetail.rating,
      title: this.productDetail.title,
      price: this.productDetail.discountedPrice,
      stock: this.productDetail.stock,
      category: this.productDetail.category,
      image: this.productDetail.images[0],
    };

    this._apiService
      .addToCart(data)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Item added to cart successfully',
          });
          this._apiService.sendCartItemCount(this.cartCount + 1);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 500) {
            this.messageService.add({
              severity: 'info',
              summary: 'Info',
              detail: 'Item already added in cart',
            });
          }
          throw error;
        },
      });
  }
}
