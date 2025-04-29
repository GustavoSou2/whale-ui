import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusActionPlanUpsertComponent } from './status-action-plan-upsert.component';

describe('StatusActionPlanUpsertComponent', () => {
  let component: StatusActionPlanUpsertComponent;
  let fixture: ComponentFixture<StatusActionPlanUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusActionPlanUpsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusActionPlanUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
