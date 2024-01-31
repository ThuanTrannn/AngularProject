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
  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
    ) { }
  hoten: string = "";
  email: string = "";
  diachi: string = "";
  dienthoai: string = "";
  totalPrice: number = 0;
  cartItems: CartItem[] = [];
  ngOnInit(): void {
    const userInfo = this.authService.getCurrentUser();
    console.log(userInfo);
  }

  taodonhang() {
    this.cartService.taoDonHang(this.hoten, this.diachi, this.dienthoai, this.email).subscribe(
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
