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
      cardNo: new FormControl(null, [Validators.required,Validators.maxLength(16),Validators.minLength(16)]),
      expiryDate: new FormControl(null, Validators.required),
      cvv: new FormControl(null, [Validators.required,Validators.maxLength(3),Validators.minLength(3)]),
    });
  }

  getOrderedItems() {
    this._apiService.orderedItemsSubject.pipe(first()).subscribe((res) => {
      this.orderedItems = res;
      this.subTotal = this.orderedItems.reduce(
        (acc: number, item: any) => acc + +item.price,
        0
      );
      this.total = this.subTotal + (this.tax / 100) * this.subTotal;
    });
  }

  placeOrder() {
    if (this.form.valid) {
      const orderedData = {
        ...this.form.value,
        orderedItems: this.orderedItems,
      };
      this.router.navigateByUrl('/orderSuccess');
    }
  }

  onCardNoInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
  }
}
