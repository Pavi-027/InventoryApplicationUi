import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyInventoryComponent } from './dummy-inventory.component';

describe('DummyInventoryComponent', () => {
  let component: DummyInventoryComponent;
  let fixture: ComponentFixture<DummyInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DummyInventoryComponent]
    });
    fixture = TestBed.createComponent(DummyInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
