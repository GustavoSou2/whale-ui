import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalFlowStatusComponent } from './approval-flow-status.component';

describe('ApprovalFlowStatusComponent', () => {
  let component: ApprovalFlowStatusComponent;
  let fixture: ComponentFixture<ApprovalFlowStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalFlowStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalFlowStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
