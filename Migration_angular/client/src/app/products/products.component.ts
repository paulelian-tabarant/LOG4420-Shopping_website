import { Component, OnInit } from '@angular/core';

import { Product, ProductsService } from '../products.service';

/**
 * Defines the component responsible to manage the display of the products page.
 */
@Component({
  selector: 'products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  products: Product[];

  curCategory: string;
  curSorting: string;

  constructor(private productsService: ProductsService) { 
    this.curCategory = 'all';
    this.curSorting = 'price-asc';
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(sortingCriteria?: string, category?: string): void {
    if(sortingCriteria)
      this.curSorting = sortingCriteria;
    if(category)
      this.curCategory = category;
    let reqCategory = this.curCategory;
    // if 'all' selected, the request must be sent without any category string
    if (this.curCategory === 'all')
      reqCategory = null;
    this.productsService.getProducts(this.curSorting, reqCategory)
      .then(products => this.products = products);
  }
}
