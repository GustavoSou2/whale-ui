import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsUiComponent } from './projects-ui.component';

describe('ProjectsUiComponent', () => {
  let component: ProjectsUiComponent;
  let fixture: ComponentFixture<ProjectsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
