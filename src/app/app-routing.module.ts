import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { ProductListComponent } from './Product/product-list/product-list.component';
import { AddProductComponent } from './Product/add-product/add-product.component';
import { EditProductComponent } from './Product/edit-product/edit-product.component';
import { CustomerListComponent } from './Customer/customer-list/customer-list.component';
import { AddCustomerComponent } from './Customer/add-customer/add-customer.component';
import { EditCustomerComponent } from './Customer/edit-customer/edit-customer.component';
import { SupplierListComponent } from './Supplier/supplier-list/supplier-list.component';
import { AddSupplierComponent } from './Supplier/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './Supplier/edit-supplier/edit-supplier.component';
import { SalesOrderListComponent } from './salesorder/sales-order-list/sales-order-list.component';
import { AddSalesOrderComponent } from './salesorder/add-sales-order/add-sales-order.component';
import { PurchaseOrderListComponent } from './PurchaseOrder/purchase-order-list/purchase-order-list.component';
import { AddPurchaseOrderComponent } from './PurchaseOrder/add-purchase-order/add-purchase-order.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './Account/register/register.component';
import { LoginComponent } from './Account/login/login.component';
import { authorizationGuards } from './shared/guards/authorization.guard';
import { ConfirmEmailComponent } from './Account/confirm-email/confirm-email.component';
import { SendEmailComponent } from './Account/send-email/send-email.component';
import { ResetPasswordComponent } from './Account/reset-password/reset-password.component';
import { adminGuard } from './shared/guards/admin.guard';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { DummyInventoryComponent } from './dummy-inventory/dummy-inventory.component';




const routes: Routes = [
  //Category
  { path: 'category/list', component: CategoryListComponent },
  { path: 'category/add', component: AddCategoryComponent },
  { path: 'category/edit&&delete/:id', component: EditCategoryComponent },

  //Product
  { path: 'product/list', component: ProductListComponent },
  { path: 'product/add', component: AddProductComponent },
  { path: 'product/edit/:id', component: EditProductComponent },

  //Customer
  { path: 'customer/list', component: CustomerListComponent },
  { path: 'customer/add', component: AddCustomerComponent },
  { path: 'customer/edit/:id', component: EditCustomerComponent },

  //Authorize Supplier & Admin
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authorizationGuards],
    children: [
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule) },
    ]
  },

  //Authorize Supplier & Admin
  // {
  //   path: '',
  //   runGuardsAndResolvers: 'always',
  //   canActivate: [adminGuard],
  //   children: [
  //     { path: 'supplier/list', component: SupplierListComponent, outlet: 'sub' },
  //     { path: 'supplier/add', component: AddSupplierComponent, outlet: 'sub' },
  //     { path: 'supplier/edit/:id', component: EditSupplierComponent, outlet: 'sub' },
  //   ]
  // },

  // //Supplierlist
  // {
  //   path: 'supplierlist',
  //   component: SupplierListComponent,
  //   outlet: 'sub',
  //   children: [
  //     { path: 'supplieradd', component: AddSupplierComponent },
  //     { path: 'supplieredit/:id', component: EditSupplierComponent },
  //   ]
  // },
  //dummyinventory
  { path: 'dummy-inventory', component: DummyInventoryComponent },

  //Supplierlist
  { path: 'supplier/list', component: SupplierListComponent },
  { path: 'supplier/add', component: AddSupplierComponent },
  { path: 'supplier/edit/:id', component: EditSupplierComponent },

  //SalesOrder
  { path: 'salesOrder/list', component: SalesOrderListComponent },
  { path: 'salesOrder/add', component: AddSalesOrderComponent },

  //PurchaseOrder
  { path: 'purchaseOrder/list', component: PurchaseOrderListComponent },
  { path: 'purchaseOrder/add', component: AddPurchaseOrderComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'Account/register', component: RegisterComponent },
  { path: 'Account/login', component: LoginComponent },
  { path: 'Account/confirm-email', component: ConfirmEmailComponent },
  { path: 'Account/send-email/:mode', component: SendEmailComponent },
  { path: 'Account/reset-password', component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
