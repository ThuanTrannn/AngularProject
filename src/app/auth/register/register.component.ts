import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private builder: FormBuilder, private service: AuthService, private router: Router, private toastr: ToastrService) { }
  isLoggedIn: boolean = false;
  registrationTitle: string = 'Register';
  submittrationTitle: string = 'Submit';
  ngOnInit() {
    this.isLoggedIn = this.service.isLoggedIn();
    this.updateRegistrationTitle();
  }

  registerForm = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    role: this.builder.control(''),
    isactive: this.builder.control(false),
    phone: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
  });

  proceedregister() {
    if (this.registerForm.valid) {
      // Kiểm tra nếu người dùng đã đăng nhập
      if (this.isLoggedIn) {
        this.service.registerUser(this.registerForm.value).subscribe(result => {
          this.toastr.success('New user added successfully', 'Success');
          this.router.navigate(['user']);
        }, error => {
          this.toastr.error('Failed to add new user', 'Error');
        });
      } else {
        // Nếu người dùng chưa đăng nhập, thực hiện đăng nhập trước khi đăng ký
        this.service.registerUser(this.registerForm.value).subscribe(result => {
          this.toastr.success('Please contact admin for enable access.', 'Registered successfully');
          this.router.navigate(['login']);
        }, error => {
          this.toastr.error('Failed to register', 'Error');
        });
      }
    } else {
      this.toastr.warning('Please enter valid data.', 'Warning');
    }
  }

  updateRegistrationTitle() {
    if (this.isLoggedIn) {
      this.registrationTitle = 'Add New User';
      this.submittrationTitle = 'Add';
    } else {
      this.registrationTitle = 'Register';
      this.submittrationTitle = 'Submit';
    }
  }
}
