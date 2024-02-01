//cart.service.ts
import { Injectable } from '@angular/core';
import { IProducts } from '../interface/products';
import { CartItem } from '../interface/icart';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
declare var localStorage: any;
@Injectable({ providedIn: 'root' })
export class CartService {
    cartItems: CartItem[] = [];
    private cartKey = 'cart';
    private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.getCart());
    cartItems$ = this.cartItemsSubject.asObservable();
    constructor(private http: HttpClient) { }

    addToCart(product: IProducts) {
        let cart = this.getCart();
        const index = cart.findIndex(item => item.product.id === product.id);
        if (index !== -1) {
            cart[index].quantity++;
        } else {
            cart.push({ product: product, quantity: 1 });
        }
        this.saveCart(cart);
    }

    getCart(): CartItem[] {
        const cartData = localStorage.getItem(this.cartKey);
        return cartData ? JSON.parse(cartData) : [];
    }

    removeCartItem(productId: number): void {
        let cart = this.getCart();
        const updatedCart = cart.filter(item => item.product.id !== productId);
        this.saveCart(updatedCart);
    }

    calculateItemPrice(item: CartItem): number {
        if (item.product && item.product.price) {
            const productPrice = item.product.price.value;
            const quantity = item.quantity;
            return productPrice * quantity;
        } else {
            return 0;
        }
    }

    private saveCart(cart: CartItem[]): void {
        localStorage.setItem(this.cartKey, JSON.stringify(cart));
        this.cartItemsSubject.next(cart);
    }

    clearCart() {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(this.cartKey);
        }
        let cart = this.getCart();
        this.saveCart(cart);
    }

    addOrder(name: string, address: string, phone: string, email: string) {
        return this.http.post("http://localhost:3000/order",
            { name: name, address: address, phone: phone, email: email },
            { observe: 'response' }
        )
    }
}