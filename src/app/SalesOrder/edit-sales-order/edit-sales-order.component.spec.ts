import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalesOrderComponent } from './edit-sales-order.component';

describe('EditSalesOrderComponent', () => {
  let component: EditSalesOrderComponent;
  let fixture: ComponentFixture<EditSalesOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSalesOrderComponent]
    });
    fixture = TestBed.createComponent(EditSalesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
