import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanValidateExecutionComponent } from './action-plan-validate-execution.component';

describe('ActionPlanValidateExecutionComponent', () => {
  let component: ActionPlanValidateExecutionComponent;
  let fixture: ComponentFixture<ActionPlanValidateExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionPlanValidateExecutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionPlanValidateExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
