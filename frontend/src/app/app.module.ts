import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HomeComponent } from './page/home/home.component';
import { ProductComponent } from './page/product/product.component';
import { OrderComponent } from './page/order/order.component';
import { IconModule } from './icon/icon.module';
import { DataTableModule } from './data-table/data-table.module';
import { CustomerComponent } from './page/customer/customer.component';
import { BillComponent } from './page/bill/bill.component';
import { BillEditComponent } from './page/bill-edit/bill-edit.component';
import { CustomerEditComponent } from './page/customer-edit/customer-edit.component';
import { OrderEditComponent } from './page/order-edit/order-edit.component';
import { ProductEditComponent } from './page/product-edit/product-edit.component';
import { LoginComponent } from './page/login/login.component';
import { JwtInterceptor } from './service/jwt.interceptor';
import { AuthService } from './service/auth.service';
import { AddressComponent } from './page/address/address.component';
import { AddressEditComponent } from './page/address-edit/address-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    ProductComponent,
    OrderComponent,
    CustomerComponent,
    BillComponent,
    BillEditComponent,
    CustomerEditComponent,
    OrderEditComponent,
    ProductEditComponent,
    LoginComponent,
    AddressComponent,
    AddressEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IconModule,
    DataTableModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      deps: [AuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
