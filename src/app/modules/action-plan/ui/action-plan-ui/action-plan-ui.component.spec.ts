import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanUiComponent } from './action-plan-ui.component';

describe('ActionPlanUiComponent', () => {
  let component: ActionPlanUiComponent;
  let fixture: ComponentFixture<ActionPlanUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionPlanUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionPlanUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
