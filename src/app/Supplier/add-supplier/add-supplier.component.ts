import { Component, OnInit } from '@angular/core';
import { addSupplier } from '../Model/addSupplier.model';
import { SupplierService } from '../service/supplier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {
  model: addSupplier;

  constructor(private supplierService: SupplierService, private router: Router) {
    this.model = {
      supplierName: '',
      phoneNumber: 0,
      emailId: '',
      streetAddress: '',
      city: '',
      state: '',
      pincode: 0
    }
  }
  ngOnInit(): void { }

  onFormSubmit() {
    this.supplierService.createSupplier(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('supplier/list');
          //this.router.navigate([{ outlets: { sub: '/supplier/list' } }]);
        }
      });
  }

  backToList(): void {
    this.supplierService.getAllSupplier()
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('supplier/list');
          //this.router.navigate([{ outlets: { sub: '/supplier/list' } }]);
        }
      });
  }
}
