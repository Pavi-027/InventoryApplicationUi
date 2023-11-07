import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMemberComponent } from './add-edit-member.component';

describe('AddEditMemberComponent', () => {
  let component: AddEditMemberComponent;
  let fixture: ComponentFixture<AddEditMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditMemberComponent]
    });
    fixture = TestBed.createComponent(AddEditMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
