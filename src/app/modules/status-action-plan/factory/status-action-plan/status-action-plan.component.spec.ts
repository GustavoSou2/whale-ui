import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusActionPlanComponent } from './status-action-plan.component';

describe('StatusActionPlanComponent', () => {
  let component: StatusActionPlanComponent;
  let fixture: ComponentFixture<StatusActionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusActionPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusActionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
