import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusActionPlanUiComponent } from './status-action-plan-ui.component';

describe('StatusActionPlanUiComponent', () => {
  let component: StatusActionPlanUiComponent;
  let fixture: ComponentFixture<StatusActionPlanUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusActionPlanUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusActionPlanUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
