import { Component } from '@angular/core';

import { Product, ProductsService } from '../products.service';

/**
 * Defines the component responsible to manage the display of the products page.
 */
@Component({
  selector: 'products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  // TODO: À compléter
  products: Product[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(sortingCriteria?: string, category?: string): void {
    this.productsService.getProducts()
      .then(products => this.products = products)
      .catch(this.ProductsService.handleError);
  }
}
