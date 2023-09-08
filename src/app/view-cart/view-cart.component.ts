import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { finalize, first } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
})
export class ViewCartComponent implements OnInit {
  cartItems: any;
  totalCartAmount = 0;

  constructor(
    private _apiService: ApiService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllCartItems();
  }

  getAllCartItems() {
    this.spinner.show();
    this.cartItems = this._apiService
      .getAllCartItems()
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      )
      .subscribe({
        next: (res) => {
          this.cartItems = res;
          this.totalCartAmount = this.cartItems.reduce(
            (acc: number, item: any) => acc + (+item.price * item.quantity),
            0
          );
        },
        error: (error: HttpErrorResponse) => {
          throw error;
        },
      });
  }

  removeCartItem(id: number) {
    this._apiService
      .removeCartItem(id)
      .pipe(first())
      .subscribe({
        next: () => {
          this._apiService.sendCartItemCount(this.cartItems.length - 1);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Item deleted successfully',
          });
          this.getAllCartItems();
        },
        error: (error: HttpErrorResponse) => {
          throw error;
        },
      });
  }

  order(){
    this._apiService.sendOrderedItems(this.cartItems)
  }
}
