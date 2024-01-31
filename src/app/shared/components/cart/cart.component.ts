import { Component } from '@angular/core';
import { CartService } from '../../../service/cart.service';
import { CartItem } from './../../../interface/icart';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  additionalPrice: number = 0;
  constructor(
    private cartService: CartService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.loadCart();
    this.cartService.cartItems$.subscribe(cartItems => {
      this.cartItems = cartItems;
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      if (item.product && item.product.price && item.quantity) {
        return total + (item.product.price.value * item.quantity);
      }
      return total;
    }, 0);
  }

  getTotalItemPrice(item: CartItem): number {
    return this.cartService.calculateItemPrice(item);
  }

  getTotalQuantity() {
    let totalQty: number = 0;
    this.cartItems.forEach(items => totalQty += items.quantity);
    return totalQty;
  }

  deleteCartItem(productId: number | undefined) {
    if (productId) {
      this.cartService.removeCartItem(productId);
      this.toastr.success('Product deletion successful');
      this.calculateTotalPrice();
    }
  }

  loadCart() {
    this.cartItems = this.cartService.getCart();
    this.calculateTotalPrice();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.totalPrice = 0;
  }
}
