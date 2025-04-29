import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorUiComponent } from './collaborator-ui.component';

describe('CollaboratorUiComponent', () => {
  let component: CollaboratorUiComponent;
  let fixture: ComponentFixture<CollaboratorUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaboratorUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
