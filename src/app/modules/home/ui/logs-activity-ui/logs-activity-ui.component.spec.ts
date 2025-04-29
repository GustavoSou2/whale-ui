import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsActivityUiComponent } from './logs-activity-ui.component';

describe('LogsActivityUiComponent', () => {
  let component: LogsActivityUiComponent;
  let fixture: ComponentFixture<LogsActivityUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogsActivityUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogsActivityUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
