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
  id: string = "";
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
          this.id = userInfo.id;
          this.name = userInfo.name;
          this.email = userInfo.email;
          this.address = userInfo.address;
          this.phone = userInfo.phone;
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  addOrder() {
    // Kiểm tra đăng nhập
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
      return;
    }
  
    // Lấy thông tin người dùng
    const currentUser = this.authService.getCurrentUser();
    currentUser.subscribe(userInfo => {
      if (userInfo) {
        this.cartService.addOrder(userInfo.id, this.name, this.address, this.phone, this.email ).subscribe(
          (response: HttpResponse<any>) => {
            if (response.ok == false) {
              alert(response.statusText);
            } else {
              // Thêm các sản phẩm trong giỏ hàng vào đơn hàng chi tiết
              this.cartService.getCartItems().forEach(
                item => {
                  this.cartService.orderDetails(userInfo.id, item).subscribe(res =>
                    console.log(response)
                  );
                }
              );
  
              this.router.navigate(['/order-success']); // Chuyển hướng đến trang thông báo đặt hàng thành công
              this.cartService.clearCart(); // Xóa giỏ hàng
              this.cartItems = []; // Xóa danh sách sản phẩm trong giỏ hàng
              this.totalPrice = 0; // Đặt lại tổng giá thành 0
              this.loadCart(); // Tải lại giỏ hàng nếu cần
            }
          }
        );
      }
    });
  }

  loadCart() {
    this.cartItems = this.cartService.getCart();
  }
}
