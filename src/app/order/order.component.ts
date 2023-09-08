import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { first } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderedItems: any[] = [];
  subTotal = 0;
  total = 0;
  tax = 10;

  form!: FormGroup;

  constructor(
    private _apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getOrderedItems();
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      cardNo: new FormControl(null, Validators.required),
      expiryDate: new FormControl(null, Validators.required),
      cvv: new FormControl(null, Validators.required),
    });
  }

  getOrderedItems() {
    this._apiService.orderedItemsSubject.pipe(first()).subscribe((res) => {
      this.orderedItems = res;
      console.log(res);
      this.subTotal = this.orderedItems.reduce(
        (acc: number, item: any) => acc + +item.price,
        0
      );
      console.log(this.subTotal);
      this.total = this.subTotal + (this.tax / 100) * this.subTotal;
    });
  }

  placeOrder() {
    if (this.form.valid) {
      const orderedData = {
        ...this.form.value,
        orderedItems: this.orderedItems,
      };
      console.log(orderedData);
      this.router.navigateByUrl('/orderSuccess');
    }
  }
}
