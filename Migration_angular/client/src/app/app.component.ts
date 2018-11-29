import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

/**
 * Defines the main component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  readonly authors = [
    'Alban Deniau',
    'Paul-Elian Tabarant'
  ];

  cartItemsCount: number;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.shoppingCartService.getItems()
      .then(items => {
        this.cartItemsCount = items.length;
      });
  }
}
