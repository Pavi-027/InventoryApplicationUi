import { Component, OnDestroy, OnInit } from '@angular/core';
import { salesOrder } from '../Model/salesOrder.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesOrderService } from '../service/sales-order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-sales-order',
  templateUrl: './edit-sales-order.component.html',
  styleUrls: ['./edit-sales-order.component.css']
})
export class EditSalesOrderComponent implements OnInit, OnDestroy {
  model: salesOrder = {
    salesId: 0,
    saleDate: new Date(),
    quantityForSale: 0,
    totalCostOfSalesOrder: 0,
    salesDiscount: 0,
    customerId: 0,
    products: []
  }
  SalesOrderId = 0;

  routeSubscription?: Subscription;
  getCustomerSubscription?: Subscription;
  editedCustomerSubscription?: Subscription;
  deleteCustomerSubscription?: Subscription;
  backToListSubscription?: Subscription;

  constructor(private route: ActivatedRoute,
    private salesOrderService: SalesOrderService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const idstr = params.get('id');
        this.SalesOrderId = +idstr!;
        if (!isNaN(this.SalesOrderId)) {
          this.salesOrderService.getSalesOrderById(this.SalesOrderId)
            .subscribe({
              next: (response) => {
                this.model = response;
              }
            })
        }
      }
    })
  }

  onFormSubmit() {
    this.salesOrderService.updateSalesOrder(this.model.salesId, this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('salesOrder/list')
        }
      });
  }

  backToList() {
    this.backToListSubscription = this.salesOrderService.getAllSalesOrder()
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('salesOrder/list');
        }
      });
  }

  onDelete() {
    if (this.SalesOrderId) {
      this.deleteCustomerSubscription = this.salesOrderService.deleteSalesOrder(this.SalesOrderId)
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
