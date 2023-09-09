import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductList } from '../Interface/custom';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://dummyjson.com';
  JsonUrl = 'https://fakeecommerceapis.onrender.com';

  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  orderedItemsSubject = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {}

  getAllProductsList(limit: number) {
    return this.http.get<ProductList>(`${this.apiUrl}/products?limit=${limit}`);
  }

  getProductCategories() {
    return this.http.get<string[]>(`${this.apiUrl}/products/categories`);
  }

  getProductDetail(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  addToCart(data: any) {
    return this.http.post<any>(`${this.JsonUrl}/carts`, data);
  }

  getAllCartItems() {
    return this.http.get<any>(`${this.JsonUrl}/carts`);
  }

  removeCartItem(id: number) {
    return this.http.delete<any>(`${this.JsonUrl}/carts/${id}`);
  }

  sendCartItemCount(count: number) {
    this.cartItemCountSubject.next(count);
  }

  sendOrderedItems(data: any) {
    this.orderedItemsSubject.next(data);
  }
}
