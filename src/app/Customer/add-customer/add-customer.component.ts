import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { addCustomer } from '../Model/addCustomer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  model: addCustomer;

  constructor(private customerService: CustomerService, private router: Router) {
    this.model = {
      customerName: '',
      phoneNumber: 0,
      emailId: '',
      streetAddress: '',
      city: '',
      state: '',
      pincode: 0
    }
  }

  ngOnInit(): void {

  }

  onFormSubmit() {
    this.customerService.createCustomer(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('customer/list');
        }
      });
  }

  backToList(): void {
    this.customerService.getAllCustomer()
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('product/list');
        }
      });
  }

}
