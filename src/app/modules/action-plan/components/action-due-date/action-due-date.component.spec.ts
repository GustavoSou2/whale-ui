import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDueDateComponent } from './action-due-date.component';

describe('ActionDueDateComponent', () => {
  let component: ActionDueDateComponent;
  let fixture: ComponentFixture<ActionDueDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionDueDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionDueDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
