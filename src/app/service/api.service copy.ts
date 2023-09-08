import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductList } from '../Interface/custom';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl="https://dummyjson.com"
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZz9zaXplPTUweDUwJnNldD1zZXQxIiwiaWF0IjoxNjM1NzczOTYyLCJleHAiOjE2MzU3Nzc1NjJ9.n9PQX8w8ocKo0dMCw3g8bKhjB8Wo7f7IONFBDqfxKhs"
  constructor(private http:HttpClient) { }

  getAllProductsList(){
    return this.http.get<ProductList>(`${this.apiUrl}/products?limit=100`)
  }

  getProductCategories(){
    return this.http.get<any>(`${this.apiUrl}/products/categories`)
  }

  getProductDetail(id:number){
    return this.http.get<any>(`${this.apiUrl}/products/${id}`)
  }

  addToCart(data:any){
    return this.http.post<any>(`http://localhost:3000/carts`,data)
  }

  getAllCartItems(){
    return this.http.get<any>(`http://localhost:3000/carts`)
  }

  removeCartItem(id:number){
    return this.http.delete<any>(`http://localhost:3000/carts/${id}`) 
  }
}
