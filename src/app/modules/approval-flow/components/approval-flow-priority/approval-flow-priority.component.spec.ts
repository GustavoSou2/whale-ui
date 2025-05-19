import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalFlowPriorityComponent } from './approval-flow-priority.component';

describe('ApprovalFlowPriorityComponent', () => {
  let component: ApprovalFlowPriorityComponent;
  let fixture: ComponentFixture<ApprovalFlowPriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalFlowPriorityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalFlowPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
