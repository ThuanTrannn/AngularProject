import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../interface/orderdetails';
import { CartService } from '../../../service/cart.service';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  orders: Order[] = [];
  userId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      if (!this.userId) {
        console.log('Không có userId trong URL');
      } else {
        this.getOrdersForUser(this.userId);
      }
    });
  }

  getOrdersForUser(userId: string): void {
    this.cartService.getOrdersForUser(userId).subscribe(
      orders => {
        this.orders = orders;
        console.log('Thông tin đơn hàng cho userId:', userId, this.orders);
      },
      error => {
        console.error('Lỗi khi lấy thông tin đơn hàng:', error);
      }
    );
  }
}
