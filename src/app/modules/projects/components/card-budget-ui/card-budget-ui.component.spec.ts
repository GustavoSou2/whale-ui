import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBudgetUiComponent } from './card-budget-ui.component';

describe('CardBudgetUiComponent', () => {
  let component: CardBudgetUiComponent;
  let fixture: ComponentFixture<CardBudgetUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBudgetUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBudgetUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
