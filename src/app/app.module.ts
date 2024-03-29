import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ListuserComponent } from './auth/listuser/listuser.component';
import { CustomerComponent } from './auth/customer/customer.component';
import { ProductTypeComponent } from './shared/components/products/product-type/product-type.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { ContentComponent } from './shared/components/content/content.component';
import { HomepagesComponent } from './shared/components/homepages/homepages.component';
import { ProductsDetailsComponent } from './shared/components/products-details/products-details.component';
import { AllproductsComponent } from './shared/components/allproducts/allproducts.component';
import { CartComponent } from './shared/components/cart/cart.component';
import { CheckoutComponent } from './shared/components/checkout/checkout.component';
import { OrderSuccessComponent } from './shared/components/order-success/order-success.component';
import { EditAccountComponent } from './auth/edit-account/edit-account.component';
import { OrderDetailsComponent } from './shared/components/order-details/order-details.component';
import { AccountDetailsComponent } from './auth/account-details/account-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ListuserComponent,
    CustomerComponent,
    ProductTypeComponent,
    SidebarComponent,
    ContentComponent,
    HomepagesComponent,
    ProductsDetailsComponent,
    AllproductsComponent,
    CartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    EditAccountComponent,
    OrderDetailsComponent,
    AccountDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    CarouselModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
