import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product, ProductsService } from '../products.service';
import { CartItem, ShoppingCartService } from '../shopping-cart.service';
import { AppComponent } from '../app.component';

/**
 * Defines the component responsible to manage the product page.
 */
@Component({
  selector: 'product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  product: Product;
  quantity: number;
  dialogVisible: boolean;

  /**
   * Initializes a new instance of the ProductComponent class.
   *
   * @param route                   The active route.
   */
  constructor(private route: ActivatedRoute, private productsService: ProductsService,
                                             private shoppingCartService: ShoppingCartService,
                                             private appComponent: AppComponent) { 
    this.quantity = 1;
  }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.getProduct(+productId);
  }

  getProduct(productId: number): void {
    this.productsService.getProduct(productId)
      .then(product => this.product = product)
      .catch(() => this.product = null);
  }

  addToCart(): void {
    this.shoppingCartService.addItem(this.product.id, this.quantity)
      .then(() => {
        this.showDialog()
        this.appComponent.getItemsCount();
      });
  }

  showDialog(): void {
    this.dialogVisible = true;
    setTimeout(() => {
      this.dialogVisible = false;
    }, 5000);
  }
}
