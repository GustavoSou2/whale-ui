import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanValidateBudgetTabComponent } from './action-plan-validate-budget-tab.component';

describe('ActionPlanValidateBudgetTabComponent', () => {
  let component: ActionPlanValidateBudgetTabComponent;
  let fixture: ComponentFixture<ActionPlanValidateBudgetTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionPlanValidateBudgetTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionPlanValidateBudgetTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
