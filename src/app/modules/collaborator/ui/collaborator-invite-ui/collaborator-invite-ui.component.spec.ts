import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorInviteUiComponent } from './collaborator-invite-ui.component';

describe('CollaboratorInviteUiComponent', () => {
  let component: CollaboratorInviteUiComponent;
  let fixture: ComponentFixture<CollaboratorInviteUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorInviteUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaboratorInviteUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
