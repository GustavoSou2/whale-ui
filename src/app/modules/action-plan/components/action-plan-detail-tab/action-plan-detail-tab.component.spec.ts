import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanDetailTabComponent } from './action-plan-detail-tab.component';

describe('ActionPlanDetailTabComponent', () => {
  let component: ActionPlanDetailTabComponent;
  let fixture: ComponentFixture<ActionPlanDetailTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionPlanDetailTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionPlanDetailTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
