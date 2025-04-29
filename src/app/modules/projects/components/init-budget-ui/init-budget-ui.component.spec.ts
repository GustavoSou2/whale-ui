import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitBudgetUiComponent } from './init-budget-ui.component';

describe('InitBudgetUiComponent', () => {
  let component: InitBudgetUiComponent;
  let fixture: ComponentFixture<InitBudgetUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitBudgetUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitBudgetUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
