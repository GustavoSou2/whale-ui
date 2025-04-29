import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalFlowUiComponent } from './approval-flow-ui.component';

describe('ApprovalFlowUiComponent', () => {
  let component: ApprovalFlowUiComponent;
  let fixture: ComponentFixture<ApprovalFlowUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalFlowUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalFlowUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
