import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductList } from '../Interface/custom';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://dummyjson.com';

  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  orderedItemsSubject = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {}

  getAllProductsList(limit:number) {
    return this.http.get<ProductList>(`${this.apiUrl}/products?limit=${limit}`);
  }

  getProductCategories() {
    return this.http.get<any>(`${this.apiUrl}/products/categories`);
  }

  getProductDetail(id: number) {
    return this.http.get<any>(`${this.apiUrl}/products/${id}`);
  }

  addToCart(data: any) {
    return this.http.post<any>(`http://localhost:3000/carts`, data);
  }

  getAllCartItems() {
    return this.http.get<any>(`http://localhost:3000/carts`);
  }

  removeCartItem(id: number) {
    return this.http.delete<any>(`http://localhost:3000/carts/${id}`);
  }

  sendCartItemCount(count: number) {
    this.cartItemCountSubject.next(count);
  }

  sendOrderedItems(data:any){
    this.orderedItemsSubject.next(data)
  }
}
