import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent {
  constructor(private router: Router) { }

  viewOrder() {
    const userId = sessionStorage.getItem('username');
    if (userId) {
      this.router.navigate(['/order-details'], { queryParams: { userId: userId } });
    } else {
      console.error('userId not found in sessionStorage');
    }
  }
}
