import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionStausComponent } from './action-staus.component';

describe('ActionStausComponent', () => {
  let component: ActionStausComponent;
  let fixture: ComponentFixture<ActionStausComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionStausComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionStausComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
