import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailUiComponent } from './project-detail-ui.component';

describe('ProjectDetailUiComponent', () => {
  let component: ProjectDetailUiComponent;
  let fixture: ComponentFixture<ProjectDetailUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDetailUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
