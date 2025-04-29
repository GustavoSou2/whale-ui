import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorFinalizeUiComponent } from './collaborator-finalize-ui.component';

describe('CollaboratorFinalizeUiComponent', () => {
  let component: CollaboratorFinalizeUiComponent;
  let fixture: ComponentFixture<CollaboratorFinalizeUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorFinalizeUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaboratorFinalizeUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
