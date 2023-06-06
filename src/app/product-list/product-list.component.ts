import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { first } from 'rxjs';
import { Product } from '../Interface/custom';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  allProducts: Product[] = [];
  productsList: Product[] = [];
  categoriesList: string[] = [];
  rangeValues: number[] = [0, 1000];
  minPrice = ['Rs 100', 'Rs 200', 'Rs 500'];
  maxPrice = ['Rs 600', 'Rs 1000', 'Rs 2000', 'Rs 10000', 'Rs 20000'];
  discountPrice!: number;
  sidebarVisible2!: boolean;

  searchTerm = '';
  constructor(private _apiService: ApiService) {}

  ngOnInit() {
    this.getProductCategories();
    this.getAllProductLists();
  }

 /**
  * This function retrieves all product lists from an API service, calculates the discount and discount
  * price for each product, and adds them to an array.
  */
  getAllProductLists() {
    this._apiService.getAllProductsList().subscribe((res) => {
      res.products.map((item:Product) => {
        let discount: number = 0;
        const discountPercentage:number = item.discountPercentage;
        discount = (discountPercentage * item.price) / 100;
        const discountPrice=item.price-discount
        this.allProducts.push({ ...item, discount: discount.toFixed(0),discountPrice:discountPrice.toFixed(0) });
        this.productsList = this.allProducts;
      });
    });
  }

 /**
  * This function retrieves a list of product categories from an API service and assigns it to a
  * variable.
  */
  getProductCategories() {
    this._apiService
      .getProductCategories()
      .pipe(first())
      .subscribe((res:string[]) => {
        this.categoriesList = res;
      });
  }

 /**
  * This function filters a list of products based on a search term that matches either the product
  * category or title.
  * @returns If the `searchTerm` is empty, the function returns without modifying the `allProducts`
  * array. If the `searchTerm` is not empty, the function filters the `allProducts` array based on
  * whether the `category` or `title` of each item includes the `searchTerm` (case-insensitive), and
  * sets the `allProducts` array to the filtered result. No explicit
  */
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

  /**
   * This function filters a list of products by category based on user input.
   * @param {any} event - The `event` parameter is an object that represents the event that triggered
   * the function. In this case, it is likely an event that is fired when the user selects a category
   * from a dropdown menu. The function then uses the value of the selected category to filter the list
   * of products and display only those
   * @returns The function does not have a return statement, but it modifies the `allProducts` array
   * based on the selected category value.
   */
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

/**
 * This function filters a list of products by their discount price based on user input.
 */
  filterByDiscount() {
    const inputValue = this.discountPrice?.toString();
    if (inputValue) {
      this.allProducts = this.productsList;
      const filteredProductsByDiscount = this.allProducts.filter((item) => {
        const itemDiscount = item.discountPrice.toString();
        return itemDiscount.startsWith(inputValue);
      });
      this.allProducts = filteredProductsByDiscount;
    } else {
      this.allProducts = this.productsList;
    }
  }

/**
 * This function filters a list of products based on a minimum and maximum price value.
 * @param {HTMLSelectElement} minPrice - An HTMLSelectElement representing the minimum price value
 * selected by the user in the HTML document.
 * @param {HTMLSelectElement} maxPrice - HTMLSelectElement is a built-in object in JavaScript that
 * represents a dropdown list of options in an HTML form. In this case, the maxPrice parameter is an
 * instance of the HTMLSelectElement class, which is used to get the maximum price value selected by
 * the user from a dropdown list on the webpage
 */
  filterByPrice(minPrice: HTMLSelectElement, maxPrice: HTMLSelectElement) {
    const minPriceValue = +minPrice.value.slice(3);
    const maxPriceValue = +maxPrice.value.slice(3);

    const filteredProducts = this.productsList.filter((item) => {
      return item.price >= minPriceValue && item.price <= maxPriceValue;
    });

    this.allProducts = filteredProducts;
  }

 /**
  * This function filters a list of products based on a selected price and updates the list of all
  * products.
  * @param {HTMLSelectElement} underPrice - HTMLSelectElement - This is a reference to a select element
  * in the HTML document that contains options for selecting a maximum price for filtering products.
  * The function extracts the selected value from this element and uses it to filter the products list.
  */
  filterProductUnderSelectedPrice(underPrice: HTMLSelectElement) {
    if(underPrice.value==='Under'){
      this.allProducts=this.productsList
      return
    }
    const uPrice = +underPrice.value.slice(3);

    const filteredProducts = this.productsList.filter((item) => {
      return item.price < uPrice;
    });

    this.allProducts = filteredProducts;
  }

  /**
   * This function filters a list of products based on a selected price value and updates the list of
   * all products.
   * @param {HTMLSelectElement} abovePrice - HTMLSelectElement - this is a reference to a select
   * element in the HTML document, which contains options for selecting a price threshold. The function
   * extracts the selected value from this element and uses it to filter a list of products.
   */
  filterProductAboveSelectedPrice(abovePrice: HTMLSelectElement) {
    if(abovePrice.value==='Above'){
      this.allProducts=this.productsList
      return
    }
    const abvPrice = +abovePrice.value.slice(3);

    const filteredProducts = this.productsList.filter((item) => {
      return item.price > abvPrice;
    });

    this.allProducts = filteredProducts;
  }

  /**
   * The function sorts products either by name or price, or displays all products if no sorting option
   * is selected.
   * @param {any} e - The parameter "e" is an event object that is passed to the function. It is likely
   * an event that is triggered by a user action, such as clicking on a dropdown menu or selecting an
   * option. The function uses the "target" property of the event object to determine which option was
   * selected by
   */
  sortBy(e:any){
    console.log(e.target.value)
    if(e.target.value==='Name'){
      this.sortProductByName()
    }else if(e.target.value==='Price'){
      this.sortProductByPrice()
    }else{
      this.allProducts=[]
      this.getAllProductLists()
    }
  }

 /**
  * This function sorts a list of products by their price in ascending order.
  */
  sortProductByPrice() {
    this.allProducts = this.productsList.sort((a, b) => a.price - b.price);
  }

 /**
  * This function sorts a list of products by their name using the localeCompare method.
  */
  sortProductByName(){
    this.allProducts=this.productsList.sort((a, b) => a.title.localeCompare(b.title));
  }
}
