import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../../service/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.clear();
    }
  }

  result: any;

  // Tạo một form buider với trường id và pass
  loginForm = this.builder.group({
    id: this.builder.control('', Validators.required), // Cung cấp các validator để kiểm tra dữ liệu trong Reactive Forms.
    password: this.builder.control('', Validators.required)
  });

  // Xử lý sự kiện khi người dùng nhấn nút đăng nhập.
  proceedLogin() {
    if (this.loginForm.valid) {
      this.service.getUserByCode(this.loginForm.value.id).subscribe(item => {
        this.result = item;

        if (this.result.password === this.loginForm.value.password) {
          if (this.result.isactive) {
            sessionStorage.setItem('username', this.result.id);
            sessionStorage.setItem('role', this.result.role);
            this.router.navigate(['']);
            this.dialog.closeAll();
          } else {
            this.toastr.error('Please contact Admin', 'InActive User');
          }
        } else {
          this.toastr.error('Invalid credentials');
        }
      });
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}
