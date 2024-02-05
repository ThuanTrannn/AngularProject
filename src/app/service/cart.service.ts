//cart.service.ts
import { Injectable, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { IProducts } from '../interface/products';
import { CartItem } from '../interface/icart';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
declare var localStorage: any;
@Injectable({ providedIn: 'root' })
export class CartService {
    cartItems: CartItem[] = [];
    private cartKey = 'cart';
    private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.getCart());
    cartItems$ = this.cartItemsSubject.asObservable();
    constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) { }

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
        if (isPlatformBrowser(this.platformId)) {
            const cartData = localStorage.getItem(this.cartKey);
            return cartData ? JSON.parse(cartData) : [];
        }
        return [];
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
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.cartKey, JSON.stringify(cart));
            this.cartItemsSubject.next(cart);
        }
    }

    clearCart() {
        if (isPlatformBrowser(this.platformId)) {
            if (typeof localStorage !== 'undefined') {
                localStorage.removeItem(this.cartKey);
            }
        }
        let cart = this.getCart();
        this.saveCart(cart);
    }

    addOrder(userId: number, name: string, address: string, phone: string, email: string) {
        return this.http.post("http://localhost:3000/order",
            { userId, name: name, address: address, phone: phone, email: email },
            { observe: 'response' }
        )
    }

    public getCartItems(): CartItem[] {
        return this.cartItemsSubject.getValue();
    }

    getOrdersByUserId(userId: string): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:3000/orderdetails?userId=${userId}`);
    }

    getOrdersForUser(userIdFromUrl: string): Observable<any[]> {
        return this.getOrdersByUserId(userIdFromUrl);
    }

    orderDetails(userId: number, item: CartItem) {
        return this.http.get<any[]>(`http://localhost:3000/orderdetails?userId=${userId}`).pipe(
            switchMap((orderDetails: any[]) => {
                const existingItem = orderDetails.find(detail => detail.idProducts === item.product.id);
                if (existingItem) {
                    // Tăng quantity nếu sản phẩm đã tồn tại trong đơn hàng chi tiết
                    existingItem.quantity += item.quantity;
                    // Update thông tin sản phẩm trong đơn hàng chi tiết trên server
                    return this.http.put<any>(`http://localhost:3000/orderdetails/${existingItem.id}`, existingItem);
                } else {
                    // Thêm sản phẩm mới vào đơn hàng chi tiết nếu chưa tồn tại
                    return this.http.post<any>("http://localhost:3000/orderdetails", {
                        "userId": userId,
                        "idProducts": item.product.id,
                        "image": item.product.image,
                        "title": item.product.title,
                        "price": item.product.price,
                        "quantity": item.quantity
                    }, { observe: 'response' });
                }
            })
        );
    }
}