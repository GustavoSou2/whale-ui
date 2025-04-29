import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStatusTableUiComponent } from './project-status-table-ui.component';

describe('ProjectStatusTableUiComponent', () => {
  let component: ProjectStatusTableUiComponent;
  let fixture: ComponentFixture<ProjectStatusTableUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectStatusTableUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectStatusTableUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
