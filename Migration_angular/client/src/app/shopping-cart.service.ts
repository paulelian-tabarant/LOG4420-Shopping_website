import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from './config';

/**
 * Defines a cart item.
 */
export class CartItem {
  productId: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http: HttpClient) { }

  private static handleError(error: any): Promise<any> {
    console.error('An error occured in cart service', error);
    return Promise.reject(error.feedbackMessage || error);
  }

  /**
   * Gets all the cart items from the server session.
   * 
   * @returns {Promise<CartItem[]>} A promise containing the items list
   */
  getItems(): Promise<CartItem[]> {
    const url = `${Config.apiUrl}/shopping-cart`;
    const options = { withCredentials: true }
    return this.http.get(url, options)
      .toPromise()
      .then(cartItems => {
          return cartItems as CartItem[]
        })
      .catch(ShoppingCartService.handleError);
  }

  /**
   * Adds a certain quantity of a given product into the cart
   * 
   * @param productId The product ID associated with the product to add into the cart
   * @param quantity  The associated quantity (number)
   */
  addItem(productId: number, quantity: number): Promise<any> {
    const url = `${Config.apiUrl}/shopping-cart`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true }
    return this.http.post(url, JSON.stringify({
      "productId": productId,
      "quantity": quantity
    }), options)
      .toPromise()
      .then(created => null)
      .catch(ShoppingCartService.handleError);
  }

  /**
   * Modifies the quantity of a given product added previously into the cart
   * 
   * @param productId     The product ID associated with the product quantity to be updated
   * @param newQuantity   The new quantity to be affected to this product
   */
  updateItemQuantity(productId: number, newQuantity: number): Promise<any> {
    const url = `${Config.apiUrl}/shopping-cart/${productId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true}
    return this.http.put(url, JSON.stringify({'quantity': newQuantity}), options)
      .toPromise()
      .then(updated => null) 
      .catch(ShoppingCartService.handleError);
  }

  /**
   * Deletes a given item from the shopping cart
   * 
   * @param productId The product ID associated with the item to be removed
   */
  deleteItem(productId: number): Promise<any> {
    const url = `${Config.apiUrl}/shopping-cart/${productId}`;
    const options = { withCredentials: true }
    return this.http.delete(url, options)
      .toPromise()
      .then(removed => null)
      .catch(ShoppingCartService.handleError);
  }

  /**
   * Deletes all the items from the shopping cart
   */
  clear(): Promise<any> {
    const url = `${Config.apiUrl}/shopping-cart/`;
    const options = { withCredentials: true }
    return this.http.delete(url, options)
      .toPromise()
      .then(cleared => null)
      .catch(ShoppingCartService.handleError);
  }
}
