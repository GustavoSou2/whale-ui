import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStepsOverviewComponent } from './project-steps-overview.component';

describe('ProjectStepsOverviewComponent', () => {
  let component: ProjectStepsOverviewComponent;
  let fixture: ComponentFixture<ProjectStepsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectStepsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectStepsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
