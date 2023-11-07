import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesOrderService } from '../service/sales-order.service';
import { salesOrder } from '../Model/salesOrder.model';

@Component({
  selector: 'app-sales-order-list',
  templateUrl: './sales-order-list.component.html',
  styleUrls: ['./sales-order-list.component.css']
})
export class SalesOrderListComponent implements OnInit {
  salesOrders$?: Observable<salesOrder[]>

  constructor(private salesOrderService: SalesOrderService) {

  }

  ngOnInit(): void {
    this.salesOrders$ = this.salesOrderService.getAllSalesOrder();

    this.salesOrders$.subscribe(salesorder => {
      console.log(salesorder);
    });
  }

}
