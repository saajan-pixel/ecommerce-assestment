import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { first } from 'rxjs';
import { Product } from '../Interface/custom';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  allProducts: Product[] = [];
  productsList: Product[] = [];
  categoriesList: string[] = [];
  SortBy: string[] = ['Name', 'Price'];
  rangeValues: number[] = [0, 1000];
  minPrice = ['Rs 100', 'Rs 200', 'Rs 300', 'Rs 400', 'Rs 500'];
  maxPrice = ['Rs 600', 'Rs 700', 'Rs 800', 'Rs 900', 'Rs 1000', 'Rs 2000'];
  discountPrice!: string;
  sidebarVisible2!: boolean;
  allProductsLength!: number;
  searchTerm = '';
  form!: FormGroup;
  smForm!: FormGroup;
  constructor(private _apiService: ApiService) {}

  ngOnInit() {
    this.createForm();
    this.createSmFormGroup();
    this.getProductCategories();
    this.getAllProductLists();
  }

  createForm() {
    this.form = new FormGroup({
      minSelect: new FormControl(),
      maxSelect: new FormControl(),
      underSelect: new FormControl(),
      aboveSelect: new FormControl(),
      sortBy: new FormControl(),
      sortByBar: new FormControl(),
      categories: new FormControl(),
    });
  }

  createSmFormGroup() {
    this.smForm = new FormGroup({
      minSelect: new FormControl(),
      maxSelect: new FormControl(),
      underSelect: new FormControl(),
      aboveSelect: new FormControl(),
      sortBy: new FormControl(),
      categories: new FormControl(),
    });
  }

  /**
   * This function retrieves all product lists from an API, calculates the discount and discount price
   * for each product, and adds them to an array.
   */
  getAllProductLists() {
    this._apiService.getAllProductsList().subscribe((res) => {
      res.products.map((item: Product) => {
        let discount: number = 0;
        const discountPercentage: number = item.discountPercentage;
        discount = (discountPercentage * item.price) / 100;
        const discountPrice = item.price - discount;
        this.allProducts.push({
          ...item,
          discount: discount.toFixed(0),
          discountPrice: discountPrice.toFixed(0),
        });
        this.productsList = this.allProducts;
        this.allProductsLength = this.allProducts.length;
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
      .subscribe((res: string[]) => {
        this.categoriesList = res;
      });
  }

  /**
   * This function filters a list of products by searching for a given search term in either the
   * product category or title.
   * @returns If the `searchTerm` is empty, the function returns without any value. If the `searchTerm`
   * is not empty, the function filters the `allProducts` array based on whether the `category` or
   * `title` of each item includes the `searchTerm` (case-insensitive). The filtered array is then
   * assigned to `allProducts` and the length of the filtered array is assigned
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
    this.allProductsLength = this.allProducts.length;
  }

  /**
   * This function filters a list of products by category based on user input.
   * @param {any} event - The event parameter is an object that represents the event that triggered the
   * function. In this case, it is likely an event object that is generated when the user selects a
   * category from a dropdown menu. The function then uses the value of the selected category to filter
   * a list of products.
   * @returns If the value of the event target is 'Select Category', then nothing is being returned
   * explicitly, but the function exits early with the `return` statement. Otherwise, the filtered
   * products are being returned and assigned to `this.allProducts`. The length of `this.allProducts`
   * is also being assigned to `this.allProductsLength`.
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
    this.allProductsLength = this.allProducts.length;
  }

  /**
   * This function filters a list of products by their discount price based on user input.
   */
  filterByDiscount() {
    this.setInitialValueForSelectControls();
    const inputValue = this.discountPrice;
    if (inputValue) {
      this.allProducts = this.productsList;
      const filteredProductsByDiscount = this.allProducts.filter((item) => {
        const itemDiscount = item.discountPercentage.toString();
        return itemDiscount.startsWith(inputValue);
      });
      this.allProducts = filteredProductsByDiscount;
      this.allProductsLength = this.allProducts.length;
    } else {
      this.allProducts = this.productsList;
    }
  }

  /**
   * The function sets the initial values for select form controls in two different forms.
   */
  setInitialValueForSelectControls() {
    this.form.get('minSelect')?.setValue('Min');
    this.form.get('maxSelect')?.setValue('Rs 2000');
    this.form.get('underSelect')?.setValue('Under');
    this.form.get('aboveSelect')?.setValue('Above');

    this.smForm.get('minSelect')?.setValue('Min');
    this.smForm.get('maxSelect')?.setValue('Rs 2000');
    this.smForm.get('underSelect')?.setValue('Under');
    this.smForm.get('aboveSelect')?.setValue('Above');

    this.form.get('categories')?.setValue('Select Category');
    this.smForm.get('categories')?.setValue('Select Category');
  }

  /**
   * This function filters a list of products based on a minimum and maximum price range.
   * @param {HTMLSelectElement} minPrice - An HTMLSelectElement representing the minimum price value
   * selected by the user.
   * @param {HTMLSelectElement} maxPrice - HTMLSelectElement - This is a reference to an HTML select
   * element that contains the maximum price value selected by the user.
   */
  filterByPrice(minPrice: HTMLSelectElement, maxPrice: HTMLSelectElement) {
    this.form.get('underSelect')?.setValue('Under');
    this.form.get('aboveSelect')?.setValue('Above');

    this.smForm.get('underSelect')?.setValue('Under');
    this.smForm.get('aboveSelect')?.setValue('Above');

    this.form.get('categories')?.setValue('Select Category');
    this.smForm.get('categories')?.setValue('Select Category');
    this.discountPrice = '';
    const minPriceValue = +minPrice.value.slice(3);
    const maxPriceValue = +maxPrice.value.slice(3);

    const filteredProducts = this.productsList.filter((item) => {
      return (
        +item.discountPrice >= minPriceValue &&
        +item.discountPrice <= maxPriceValue
      );
    });

    this.allProducts = filteredProducts;
    this.allProductsLength = this.allProducts.length;
  }

  /**
   * This function filters a list of products based on a selected price and updates the displayed
   * products accordingly.
   * @param {HTMLSelectElement} underPrice - HTMLSelectElement - This is a reference to the HTML select
   * element that contains the options for selecting a maximum price for filtering products.
   * @returns The function does not return anything, it updates the value of `this.allProducts` and
   * `this.allProductsLength`.
   */
  filterProductUnderSelectedPrice(underPrice: HTMLSelectElement) {
    this.form.get('minSelect')?.setValue('Min');
    this.form.get('maxSelect')?.setValue('Rs 2000');
    this.form.get('aboveSelect')?.setValue('Above');

    this.form.get('categories')?.setValue('Select Category');
    this.smForm.get('categories')?.setValue('Select Category');

    this.smForm.get('minSelect')?.setValue('Min');
    this.smForm.get('maxSelect')?.setValue('Rs 2000');
    this.smForm.get('aboveSelect')?.setValue('Above');
    this.discountPrice = '';

    if (underPrice.value === 'Under') {
      this.allProducts = this.productsList;
      return;
    }
    const uPrice = +underPrice.value.slice(3);

    const filteredProducts = this.productsList.filter((item) => {
      return +item.discountPrice < uPrice;
    });

    this.allProducts = filteredProducts;
    this.allProductsLength = this.allProducts.length;
  }

  /**
   * The function filters a list of products based on a selected price and updates the displayed
   * products accordingly.
   * @param {HTMLSelectElement} abovePrice - HTMLSelectElement - this is a reference to a dropdown
   * select element in the HTML document. The function filters a list of products based on a selected
   * price value from this dropdown.
   * @returns The function does not return anything, it updates the value of `this.allProducts` and
   * `this.allProductsLength`.
   */
  filterProductAboveSelectedPrice(abovePrice: HTMLSelectElement) {
    this.form.get('minSelect')?.setValue('Min');
    this.form.get('maxSelect')?.setValue('Rs 2000');
    this.form.get('underSelect')?.setValue('Under');
    this.form.get('categories')?.setValue('Select Category');
    this.smForm.get('categories')?.setValue('Select Category');
    this.smForm.get('minSelect')?.setValue('Min');
    this.smForm.get('maxSelect')?.setValue('Rs 2000');
    this.smForm.get('underSelect')?.setValue('Under');
    this.discountPrice = '';

    if (abovePrice.value === 'Above') {
      this.allProducts = this.productsList;
      return;
    }
    const abvPrice = +abovePrice.value.slice(3);

    const filteredProducts = this.productsList.filter((item) => {
      return +item.discountPrice > abvPrice;
    });

    this.allProducts = filteredProducts;
    this.allProductsLength = this.allProducts.length;
  }

  /**
   * The function sorts products either by name or price, or displays all products if no sorting option
   * is selected.
   * @param {any} e - The parameter "e" is an event object that is passed to the function. It is likely
   * an event that is triggered by a user action, such as clicking on a dropdown menu or selecting an
   * option. The function uses the "target" property of the event object to determine which option was
   * selected by
   */
  sortBy(e: any) {
    this.setInitialValueForSelectControls();
    if (e.target.value === 'Name') {
      this.sortProductByName();
    } else if (e.target.value === 'Price') {
      this.sortProductByPrice();
    } else {
      this.allProducts = [];
      this.getAllProductLists();
    }
  }

  /**
   * This function sorts a list of products by their discount price in ascending order.
   */
  sortProductByPrice() {
    this.allProducts = this.productsList.sort(
      (a, b) => +a.discountPrice - +b.discountPrice
    );
  }

  /**
   * This function sorts a list of products by their name using the localeCompare method.
   */
  sortProductByName() {
    this.allProducts = this.productsList.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  /**
   * The function resets various form values to their default state.
   */
  goBack() {
    this.searchTerm = '';
    this.discountPrice = '';
    this.form.get('minSelect')?.setValue('Min');
    this.form.get('maxSelect')?.setValue('Rs 2000');
    this.form.get('underSelect')?.setValue('Under');
    this.form.get('categories')?.setValue('Select Category');
    this.form.get('sortBy')?.setValue('Sort By');

    this.smForm.get('minSelect')?.setValue('Min');
    this.smForm.get('maxSelect')?.setValue('Rs 2000');
    this.smForm.get('underSelect')?.setValue('Under');
    this.smForm.get('categories')?.setValue('Select Category');
    this.smForm.get('sortBy')?.setValue('Sort By');
  }
}
