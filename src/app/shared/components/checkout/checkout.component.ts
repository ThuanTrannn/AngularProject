import { Component } from '@angular/core';
import { CartService } from '../../../service/cart.service';
import { HttpResponse } from '@angular/common/http'; // Import HttpResponse type
import { Router } from '@angular/router';
import { CartItem } from './../../../interface/icart';
import { AuthService } from '../../../service/auth.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  name: string = "";
  email: string = "";
  address: string = "";
  phone: string = "";
  totalPrice: number = 0;
  cartItems: CartItem[] = [];
  currentUser: any;
  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) { this.currentUser = this.authService.getCurrentUser(); }
  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo() {
    if (this.authService.isLoggedIn()) {
      this.authService.getCurrentUser().subscribe(userInfo => {
        if (userInfo) {
          this.name = userInfo.name;
          this.email = userInfo.email;
          this.address = userInfo.address ? userInfo.address.area : '';
          this.phone = userInfo.phone;
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  addOrder() {
    this.cartService.addOrder(this.name, this.address, this.phone, this.email).subscribe(
      (response: HttpResponse<any>) => { // Explicitly define the type of response
        console.log(response);
        console.log(response.body); // trong body có biến id của order mới chèn
        console.log(response.ok); // biến ok = true là request ok
        if (response.ok) {
          this.router.navigate(['/order-success']);
          this.cartService.clearCart();
          this.cartItems = [];
          this.totalPrice = 0;
          this.loadCart();
        }
      }
    );
  }

  loadCart() {
    this.cartItems = this.cartService.getCart();
  }
}
