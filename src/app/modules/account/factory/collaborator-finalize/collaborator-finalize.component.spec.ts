import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorFinalizeComponent } from './collaborator-finalize.component';

describe('CollaboratorFinalizeComponent', () => {
  let component: CollaboratorFinalizeComponent;
  let fixture: ComponentFixture<CollaboratorFinalizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorFinalizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaboratorFinalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
