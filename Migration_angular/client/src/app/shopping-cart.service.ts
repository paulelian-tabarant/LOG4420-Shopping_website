import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Config } from './config';

/**
 * Defines an item from shopping-cart.
 */
export class Item {
  productId: number;
  quantity: number;
}

/**
 * Defines the service responsible to retrieve the products in the database.
 */
@Injectable()
export class ShoppingCartService {

  /**
   * Handles the current error.
   *
   * @param error                   The error to handle.
   * @return {Promise<object>}      A promise object.
   */
  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.feedbackMessage || error);
  }

  /**
   * Initializes a new instance of the ProductsService class.
   *
   * @param http                    The HTTP service to use.
   */
  constructor(private http: HttpClient) { }

  /**
   * Gets all the items in the shopping-cart.
   *
   * @return {Promise<Item[]>}   The items from the shopping-cart.
   */
  getItems(): Promise<Item[]> {
    const url = `${Config.apiUrl}/shopping-cart`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = {headers: headers, withCredentials: true};
    return this.http.get(url, options)
      .toPromise()
      .then(items => items as Item[])
      .catch(ShoppingCartService.handleError);
  }
}
