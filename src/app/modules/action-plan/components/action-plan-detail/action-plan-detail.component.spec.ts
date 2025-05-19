import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanDetailComponent } from './action-plan-detail.component';

describe('ActionPlanDetailComponent', () => {
  let component: ActionPlanDetailComponent;
  let fixture: ComponentFixture<ActionPlanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionPlanDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionPlanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
