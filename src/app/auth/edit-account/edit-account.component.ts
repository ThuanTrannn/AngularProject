import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  editForm!: FormGroup;
  accountId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private accountService: AuthService,
    private tostr:ToastrService,
  ) {}

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      phone: ['', Validators.required],
      isactive: ['true', Validators.required],
      address: ['true', Validators.required],
    });

    this.route.params.subscribe(params => {
      this.accountId = params['id'];
      this.getAccountDetails();
    });
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

  onSubmit() {
    const formData = this.editForm.value;
    formData.isactive = formData.isactive === 'active';
    this.accountService.updateAccount(this.accountId, formData).subscribe(
      response => {
        this.tostr.success('Account updated successfully.')
      },
      error => {
        console.error('Error updating account', error);
        this.tostr.error('Error updating account.')
      }
    );
  }
}
