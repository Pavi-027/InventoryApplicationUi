import { Component, OnDestroy, OnInit } from '@angular/core';
import { supplier } from '../Model/supplier.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../service/supplier.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent implements OnInit, OnDestroy {
  model: supplier = {
    supplierId: 0,
    supplierName: "",
    phoneNumber: 0,
    emailId: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: 0
  }
  SupplierId = 0;
  // model?: Customer;

  routeSubscription?: Subscription;
  getCustomerSubscription?: Subscription;
  editedCustomerSubscription?: Subscription;
  deleteCustomerSubscription?: Subscription;
  backToListSubscription?: Subscription;


  constructor(private activeRoute: ActivatedRoute,
    private supplierService: SupplierService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: (params) => {
        const idStr = params.get('id');
        this.SupplierId = +idStr!;
        if (!isNaN(this.SupplierId)) {
          this.supplierService.getSupplierById(this.SupplierId)
            .subscribe({
              next: (response) => {
                this.model = response;
              }
            });
        }
      }
    });
  }

  onFormSubmit() {
    this.supplierService.updateSupplier(this.model.supplierId, this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('supplier/list')
          //this.router.navigate([{ outlets: { sub: 'supplier/list' } }]);
        }
      });
  }

  backToList() {
    this.backToListSubscription = this.supplierService.getAllSupplier()
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('supplier/list');
          //this.router.navigate([{ outlets: { sub: 'supplier/list' } }]);
        }
      });
  }

  onDelete() {
    if (this.SupplierId) {
      this.deleteCustomerSubscription = this.supplierService.deleteSupplier(this.SupplierId)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('supplier/list');
            //this.router.navigate([{ outlets: { sub: 'supplier/list' } }]);
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getCustomerSubscription?.unsubscribe();
    this.editedCustomerSubscription?.unsubscribe();
    this.deleteCustomerSubscription?.unsubscribe();
    this.backToListSubscription?.unsubscribe();
  }
}
