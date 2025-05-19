import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionReportsComponent } from './execution-reports.component';

describe('ExecutionReportsComponent', () => {
  let component: ExecutionReportsComponent;
  let fixture: ComponentFixture<ExecutionReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutionReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutionReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
