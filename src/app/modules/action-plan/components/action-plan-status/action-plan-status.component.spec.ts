import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanStatusComponent } from './action-plan-status.component';

describe('ActionPlanStatusComponent', () => {
  let component: ActionPlanStatusComponent;
  let fixture: ComponentFixture<ActionPlanStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionPlanStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionPlanStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
