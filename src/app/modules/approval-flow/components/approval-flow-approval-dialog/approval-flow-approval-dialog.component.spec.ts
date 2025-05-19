import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalFlowApprovalDialogComponent } from './approval-flow-approval-dialog.component';

describe('ApprovalFlowApprovalDialogComponent', () => {
  let component: ApprovalFlowApprovalDialogComponent;
  let fixture: ComponentFixture<ApprovalFlowApprovalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalFlowApprovalDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalFlowApprovalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
