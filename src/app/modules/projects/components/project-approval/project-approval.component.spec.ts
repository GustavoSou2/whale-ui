import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectApprovalComponent } from './project-approval.component';

describe('ProjectApprovalComponent', () => {
  let component: ProjectApprovalComponent;
  let fixture: ComponentFixture<ProjectApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectApprovalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
