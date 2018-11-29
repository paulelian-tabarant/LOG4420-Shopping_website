import { Component } from '@angular/core';

import { Product, ProductsService } from '../products.service';
import { Item, ShoppingCartService } from '../shopping-cart.service';

/**
 * Defines the component responsible to manage the shopping cart page.
 */
@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent {
  // TODO: À compléter
  products: Product[];
  items: Item[];
  fullItems: {
  	product: Product,
  	quantity: number
  }[];

  constructor(private productsService: ProductsService, private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.getItems();
    
  }

  getItems(): void {
    this.shoppingCartService.getItems()
      .then(items => this.items = items);
  }
  getProduct(id: number): void {
    return this.productsService.getProduct(id)
      .then(product => product as Product);
  }

}
