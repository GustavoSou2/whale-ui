import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionApprovalCrateDialogComponent } from './action-approval-crate-dialog.component';

describe('ActionApprovalCrateDialogComponent', () => {
  let component: ActionApprovalCrateDialogComponent;
  let fixture: ComponentFixture<ActionApprovalCrateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionApprovalCrateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionApprovalCrateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
