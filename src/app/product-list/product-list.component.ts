import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  allProducts: any[] = [];
  productsList: any[] = [];
  categoriesList: string[] = [];
  rangeValues: number[] = [0, 1000];
  minPrice = ['Rs 500', 'Rs 1000', 'Rs 2000'];
  maxPrice = ['Rs 10000', 'Rs 20000'];
  discountPrice!: number;

  searchTerm = '';
  constructor(private _apiService: ApiService) {}

  ngOnInit() {
    this.getProductCategories();
    this.getAllProductLists();
  }

  getAllProductLists() {
    this._apiService.getAllProductsList().subscribe((res) => {
      res.products.map((item: any) => {
        let discount: number = 0;
        const discountPercentage = item.discountPercentage;
        discount = (discountPercentage * item.price) / 100;
        this.allProducts.push({ ...item, discount: discount.toFixed(2) });
        this.productsList = this.allProducts;
      });

      console.log(this.allProducts);
    });
  }

  getProductCategories() {
    this._apiService
      .getProductCategories()
      .pipe(first())
      .subscribe((res) => {
        this.categoriesList = res;
        // this.categoriesList = res.map((item: string, i: number) => {
        //   return { id: i + 1, name: item};
        // });

        console.log('ccc', this.categoriesList);
      });
  }

  searchProductByNameOrCategory() {
    if (!this.searchTerm) {
      this.allProducts = this.productsList; // Show all products when search term is empty
      return;
    }

    const filteredProducts = this.allProducts.filter(
      (item) =>
        item.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.allProducts = filteredProducts;
  }

  filterByCategory(event: any) {
    this.allProducts = this.productsList;
    const value = event.target.value;
    if (value === 'Select Category') {
      this.allProducts = this.productsList;
      return;
    }
    const filteredProducts = this.allProducts.filter((item) =>
      item.category.toLowerCase().includes(value.toLowerCase())
    );
    this.allProducts = filteredProducts;
  }

  filterByDiscount() {
    const inputValue = this.discountPrice?.toString();
    if (inputValue) {
      this.allProducts = this.productsList;
      const filteredProductsByDiscount = this.allProducts.filter((item) => {
        const itemDiscount = item.discount.toString();
        return itemDiscount.startsWith(inputValue);
      });
      this.allProducts = filteredProductsByDiscount;
    } else {
      this.allProducts = this.productsList;
    }
  }
}
