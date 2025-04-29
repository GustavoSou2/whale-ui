import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionReprovalCrateDialogComponent } from './action-reproval-crate-dialog.component';

describe('ActionReprovalCrateDialogComponent', () => {
  let component: ActionReprovalCrateDialogComponent;
  let fixture: ComponentFixture<ActionReprovalCrateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionReprovalCrateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionReprovalCrateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
