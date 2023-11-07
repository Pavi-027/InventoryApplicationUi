import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Observable } from 'rxjs';
import { Customer } from '../Model/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers$?: Observable<Customer[]>

  constructor(private customerService: CustomerService) {

  }

  ngOnInit(): void {
    this.customers$ = this.customerService.getAllCustomer();

    this.customers$.subscribe(customer => {
      console.log(customer);
    })
  }

}
