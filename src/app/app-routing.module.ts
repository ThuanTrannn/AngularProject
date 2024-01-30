import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListuserComponent } from './auth/listuser/listuser.component';
import { CustomerComponent } from './auth/customer/customer.component'; 
import { HomepagesComponent } from './shared/components/homepages/homepages.component';
import { AllproductsComponent } from './shared/components/allproducts/allproducts.component'; 
import { ProductsDetailsComponent } from './shared/components/products-details/products-details.component'; 
import { CartComponent } from './shared/components/cart/cart.component'; 
const routes: Routes = [
  {component: HomepagesComponent, path: ''},
  {component: LoginComponent, path: 'login'},
  {component: RegisterComponent, path: 'register'},
  {component: ListuserComponent,path:'user',canActivate:[AuthGuard]},
  {component: CustomerComponent,path:'customer',canActivate:[AuthGuard]},
  {component: ProductsDetailsComponent, path: 'products/:id'},
  {component: AllproductsComponent, path: 'all-products'},
  {component: CartComponent, path: 'cart'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
