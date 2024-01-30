//cart.service.ts
import { Injectable } from '@angular/core';
import { IProducts } from '../interface/products';
import { CartItem } from '../interface/icart';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class CartService {
    cartItems: CartItem[] = [];
    constructor() { }
    addToCart(product: IProducts) {
        const existingItem = this.cartItems.find(item => item.product.id === product.id);
        if (existingItem) {
        existingItem.quantity++;
        } else {
        this.cartItems.push({ product: product, quantity: 1 });
        }
    }

    getCartItems(): CartItem[] {
        return this.cartItems;
    }

    clearCart() {
        this.cartItems = [];
    }
}