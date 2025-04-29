import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusUiComponent } from './status-ui.component';

describe('StatusUiComponent', () => {
  let component: StatusUiComponent;
  let fixture: ComponentFixture<StatusUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
