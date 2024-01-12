import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListuserComponent } from './auth/listuser/listuser.component';
import { CustomerComponent } from './auth/customer/customer.component'; 

const routes: Routes = [
  {component: LoginComponent, path: 'login'},
  {component: RegisterComponent, path: 'register'},
  {component: ListuserComponent,path:'user',canActivate:[AuthGuard]},
  {component: CustomerComponent,path:'customer',canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
