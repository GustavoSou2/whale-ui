import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanValidateChecklistComponent } from './action-plan-validate-checklist.component';

describe('ActionPlanValidateChecklistComponent', () => {
  let component: ActionPlanValidateChecklistComponent;
  let fixture: ComponentFixture<ActionPlanValidateChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionPlanValidateChecklistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionPlanValidateChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
