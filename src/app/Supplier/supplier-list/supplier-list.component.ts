import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { supplier } from '../Model/supplier.model';
import { SupplierService } from '../service/supplier.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  suppliers$?: Observable<supplier[]>

  constructor(private supplierService: SupplierService) {

  }
  ngOnInit(): void {
    this.suppliers$ = this.supplierService.getAllSupplier();

    this.suppliers$.subscribe(supplier => {
      console.log(supplier);
    })
  }

}
