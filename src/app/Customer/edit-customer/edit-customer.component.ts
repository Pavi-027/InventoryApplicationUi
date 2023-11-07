import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../Model/customer.model';
import { Subscription } from 'rxjs';
import { editCustomer } from '../Model/editCustomer.model';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit, OnDestroy {
  model: Customer = {
    customerId: 0,
    customerName: "",
    phoneNumber: 0,
    emailId: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: 0
    //salesOrders: salesOrder[]
  }
  CustomerId = 0;
  // model?: Customer;

  routeSubscription?: Subscription;
  getCustomerSubscription?: Subscription;
  editedCustomerSubscription?: Subscription;
  deleteCustomerSubscription?: Subscription;
  backToListSubscription?: Subscription;


  constructor(private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router, private activeRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: (params) => {
        const idStr = params.get('id');
        this.CustomerId = +idStr!;
        if (!isNaN(this.CustomerId)) {
          this.customerService.getCustomerById(this.CustomerId)
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
    this.customerService.updateCustomer(this.model.customerId, this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('customer/list')
        }
      });
  }

  backToList() {
    this.backToListSubscription = this.customerService.getAllCustomer()
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('customer/list');
        }
      });
  }

  onDelete() {
    if (this.CustomerId) {
      this.deleteCustomerSubscription = this.customerService.deleteCustomer(this.CustomerId)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('customer/list');
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
