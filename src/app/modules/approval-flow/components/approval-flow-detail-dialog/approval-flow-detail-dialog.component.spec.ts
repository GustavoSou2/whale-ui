import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalFlowDetailDialogComponent } from './approval-flow-detail-dialog.component';

describe('ApprovalFlowDetailDialogComponent', () => {
  let component: ApprovalFlowDetailDialogComponent;
  let fixture: ComponentFixture<ApprovalFlowDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalFlowDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalFlowDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
