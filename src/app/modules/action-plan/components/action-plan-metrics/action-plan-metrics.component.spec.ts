import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanMetricsComponent } from './action-plan-metrics.component';

describe('ActionPlanMetricsComponent', () => {
  let component: ActionPlanMetricsComponent;
  let fixture: ComponentFixture<ActionPlanMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionPlanMetricsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionPlanMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
