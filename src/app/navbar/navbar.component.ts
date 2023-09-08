import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  cartItemCount=0
  constructor(private _apiService:ApiService){}

  ngOnInit(): void {
    this._apiService.getAllCartItems().pipe(first()).subscribe(res=> this.cartItemCount=res.length)
    this._apiService.cartItemCount$.subscribe(res=> this.cartItemCount=res)
  }

}
