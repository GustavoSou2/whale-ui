import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetUpsertDialogComponent } from './budget-upsert-dialog.component';

describe('BudgetUpsertDialogComponent', () => {
  let component: BudgetUpsertDialogComponent;
  let fixture: ComponentFixture<BudgetUpsertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetUpsertDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetUpsertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
