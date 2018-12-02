import { Component, OnInit } from '@angular/core';
import { CartItem, ShoppingCartService } from '../shopping-cart.service';
import { Product, ProductsService } from '../products.service';
import { AppComponent } from '../app.component'

class ItemRow {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

/**
 * Defines the component responsible to manage the shopping cart page.
 */
@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {
  items: ItemRow[]
  totalAmount: number;

  constructor(private shoppingCartService: ShoppingCartService,
    private productsService: ProductsService,
    private appComponent: AppComponent) { }

  ngOnInit() {
    this.refreshItemsList();
  }

  /**
   * Gets current cart state from the server.
   * Should be called each time an item is removed, added or modified remotely
   */
  refreshItemsList() {
    this.items = [];
    this.shoppingCartService.getItems()
      .then(cartItems => {
        console.log("Cart: ", cartItems);
        cartItems.forEach(item => {
          this.productsService.getProduct(item.productId)
            .then(product => {
              this.items.push({
                id: item.productId,
                name: product.name,
                price: product.price,
                quantity: item.quantity
              });
              this.items.sort((item1, item2) => item1.name.localeCompare(item2.name, 'en', {'sensitivity': 'base'}));
              this.totalAmount = this.getTotalAmount();
            });
        });
        this.appComponent.getItemsCount();
      });
  }

  deleteItem(item: ItemRow) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit du panier ?")) {
      this.shoppingCartService.deleteItem(item.id)
        .then(() => this.refreshItemsList());
    }
  }

  decrementQuantity(item: ItemRow) {
    this.shoppingCartService.updateItemQuantity(item.id, item.quantity - 1)
      .then(() => this.refreshItemsList());
  }

  incrementQuantity(item: ItemRow) {
    this.shoppingCartService.updateItemQuantity(item.id, item.quantity + 1)
      .then(() => this.refreshItemsList());
  }

  getTotalAmount() {
    let total = 0.0;
    this.items.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  }

  deleteAllItems() {
    if (confirm("Êtes-vous sûr de vouloir vider votre panier ?")) {
      this.shoppingCartService.clear()
        .then(() => this.refreshItemsList());
    }
  }
}
