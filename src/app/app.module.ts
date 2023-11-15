import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { AddProductComponent } from './Product/add-product/add-product.component';
import { ProductListComponent } from './Product/product-list/product-list.component';
import { EditProductComponent } from './Product/edit-product/edit-product.component';
import { CustomerListComponent } from './Customer/customer-list/customer-list.component';
import { AddCustomerComponent } from './Customer/add-customer/add-customer.component';
import { EditCustomerComponent } from './Customer/edit-customer/edit-customer.component';
import { SupplierListComponent } from './Supplier/supplier-list/supplier-list.component';
import { AddSupplierComponent } from './Supplier/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './Supplier/edit-supplier/edit-supplier.component';
import { SalesOrderListComponent } from './salesorder/sales-order-list/sales-order-list.component';
import { AddSalesOrderComponent } from './salesorder/add-sales-order/add-sales-order.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PurchaseOrderListComponent } from './PurchaseOrder/purchase-order-list/purchase-order-list.component';
import { AddPurchaseOrderComponent } from './PurchaseOrder/add-purchase-order/add-purchase-order.component';
import { SidenavComponent } from './sidenav/sidenav.component';
// import { SidenavComponent } from './sidenav/SidenavComponent';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { ValidationMessagesComponent } from './shared/components/errors/validation-messages/validation-messages.component';
import { NotificationComponent } from './shared/components/modals/notification/notification.component';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { ConfirmEmailComponent } from './Account/confirm-email/confirm-email.component';
import { SendEmailComponent } from './Account/send-email/send-email.component';
import { ResetPasswordComponent } from './Account/reset-password/reset-password.component';
import { UserHasRoleDirectiveDirective } from './shared/directives/user-has-role-directive.directive';
import { ThemeService } from './theme.service';
//import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AddProductComponent,
    ProductListComponent,
    EditProductComponent,
    CustomerListComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    SupplierListComponent,
    AddSupplierComponent,
    EditSupplierComponent,
    SalesOrderListComponent,
    AddSalesOrderComponent,
    PurchaseOrderListComponent,
    AddPurchaseOrderComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    ValidationMessagesComponent,
    NotificationComponent,
    ConfirmEmailComponent,
    SendEmailComponent,
    ResetPasswordComponent,
    UserHasRoleDirectiveDirective,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //MultiSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    ModalModule.forRoot()

  ],
  providers: [
    ThemeService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
