import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPriorityComponent } from './action-priority.component';

describe('ActionPriorityComponent', () => {
  let component: ActionPriorityComponent;
  let fixture: ComponentFixture<ActionPriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionPriorityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
