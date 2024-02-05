import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  editForm!: FormGroup;
  accountId!: string;
  userId: string = '';
  isFormDisabled: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AuthService,
    private tostr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.required],
      name: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      password: [{ value: '', disabled: true }, Validators.required],
      role: [{ value: '', disabled: true }, Validators.required],
      phone: [{ value: '', disabled: true }, Validators.required],
      address: [{ value: '', disabled: true }, Validators.required], // Chú ý đặt lại required cho trường này nếu cần
    });

    this.loadUserInfo();
  }

  getAccountDetails() {
    this.accountService.getAccountById(this.accountId).subscribe(
      (account: any) => {
        account.isactive = account.isactive ? 'active' : 'inactive';
        this.editForm.patchValue(account);
        console.log(account);
      },
      error => {
        console.error('Error fetching account details', error);
      }
    );
  }

  loadUserInfo() {
    if (this.accountService.isLoggedIn()) {
      this.accountService.getCurrentUser().subscribe(userInfo => {
        if (userInfo) {
          this.userId = userInfo.id;
          this.editForm.patchValue({
            id: userInfo.id,
            name: userInfo.name,
            email: userInfo.email,
            password: userInfo.password,
            phone: userInfo.phone,
            address: userInfo.address,
          });
        }
      });
    }
  }

  onSubmit() {
    const formData = this.editForm.value;
    formData.isactive = formData.isactive === 'active';
    this.accountService.updateAccount(this.userId, formData).subscribe(
      response => {
        this.tostr.success('Account updated successfully.');
        this.editForm.disable();
        this.isFormDisabled = true;
      },
      error => {
        console.error('Error updating account', error);
        this.tostr.error('Error updating account.');
      }
    );
  }

  toggleEditMode() {
    this.isFormDisabled = !this.isFormDisabled;
    if (this.isFormDisabled) {
      this.editForm.disable();
    } else {
      this.editForm.enable();
    }
  }

  viewOrder(userId: string) {
    this.router.navigate(['/order-details'], { queryParams: { userId: userId } });
  }
}

