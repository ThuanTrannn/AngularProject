import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListuserComponent } from './auth/listuser/listuser.component';
import { AccountDetailsComponent } from './auth/account-details/account-details.component';
import { CustomerComponent } from './auth/customer/customer.component'; 
import { HomepagesComponent } from './shared/components/homepages/homepages.component';
import { AllproductsComponent } from './shared/components/allproducts/allproducts.component'; 
import { ProductsDetailsComponent } from './shared/components/products-details/products-details.component'; 
import { CartComponent } from './shared/components/cart/cart.component'; 
import { CheckoutComponent } from './shared/components/checkout/checkout.component';
import { OrderSuccessComponent } from './shared/components/order-success/order-success.component';
import { EditAccountComponent } from './auth/edit-account/edit-account.component';
import { OrderDetailsComponent } from './shared/components/order-details/order-details.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {component: HomepagesComponent, path: 'home'},
  {component: LoginComponent, path: 'login'},
  {component: RegisterComponent, path: 'register'},
  {component: ListuserComponent,path:'user',canActivate:[AuthGuard]},
  {component: CustomerComponent,path:'customer',canActivate:[AuthGuard]},
  {component: ProductsDetailsComponent, path: 'products/:id'},
  {component: AllproductsComponent, path: 'all-products'},
  {component: CartComponent, path: 'cart'},
  {component: CheckoutComponent, path: 'checkout', canActivate: [AuthGuard]},
  {component: OrderSuccessComponent, path: 'order-success' },
  {component: EditAccountComponent, path: 'edit-account/:id' },
  {component: AccountDetailsComponent, path: 'account-detail', canActivate:[AuthGuard]},
  {component: OrderDetailsComponent, path: 'order-details' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
