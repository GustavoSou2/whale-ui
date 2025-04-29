import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanSkeletonComponent } from './action-plan-skeleton.component';

describe('ActionPlanSkeletonComponent', () => {
  let component: ActionPlanSkeletonComponent;
  let fixture: ComponentFixture<ActionPlanSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionPlanSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionPlanSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
