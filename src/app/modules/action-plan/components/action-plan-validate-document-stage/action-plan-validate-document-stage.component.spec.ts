import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanValidateDocumentStageComponent } from './action-plan-validate-document-stage.component';

describe('ActionPlanValidateDocumentStageComponent', () => {
  let component: ActionPlanValidateDocumentStageComponent;
  let fixture: ComponentFixture<ActionPlanValidateDocumentStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionPlanValidateDocumentStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionPlanValidateDocumentStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
