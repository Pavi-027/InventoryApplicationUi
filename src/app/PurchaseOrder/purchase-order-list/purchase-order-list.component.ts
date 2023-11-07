import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { purchaseOrder } from '../Model/purchaseOrder.model';
import { PurchaseOrderService } from '../service/purchase-order.service';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.css']
})
export class PurchaseOrderListComponent implements OnInit {
  purchaseOrder$?: Observable<purchaseOrder[]>

  constructor(private purchaseOrderService: PurchaseOrderService) {

  }

  ngOnInit(): void {
    this.purchaseOrder$ = this.purchaseOrderService.getAllPurchaseOrder();

    this.purchaseOrder$.subscribe(purchaseOrder => {
      console.log(purchaseOrder);
    });
  }
}
