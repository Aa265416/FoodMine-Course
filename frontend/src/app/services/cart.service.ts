import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/Food';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private CartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() {}

  addToCart(food: Food): void {
    //checking cart is empty or not
    let cartItem = this.cart.items.find((item) => item.food.id === food.id);

    if (cartItem) return;
    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter((item) => item.food.id != foodId);
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: string, quantiy: number) {
    let cartItem = this.cart.items.find((item) => item.food.id === foodId);

    if (!cartItem) return;

    cartItem.quantity = quantiy;
    cartItem.price = quantiy * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  getCart(): Cart{
    return this.CartSubject.value;
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }
  getCartObservable(): Observable<Cart> {
    return this.CartSubject.asObservable();
  }

  private setCartToLocalStorage(): void {
    //total price
    this.cart.totalPrice = this.cart.items
    .reduce((prevSum, currentItem) => prevSum + currentItem.price,0);

    //total Count
    this.cart.totalCount = this.cart.items
    .reduce((prevSum, currentItem) => prevSum + currentItem.quantity,0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);

    this.CartSubject.next(this.cart);
  }

  private getCartFromLocalStorage():Cart{
    const cartjson = localStorage.getItem('Cart');
    return cartjson? JSON.parse(cartjson) : new Cart();
  }

}
