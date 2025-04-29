import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusUpsertUiComponent } from './status-upsert-ui.component';

describe('StatusUpsertUiComponent', () => {
  let component: StatusUpsertUiComponent;
  let fixture: ComponentFixture<StatusUpsertUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusUpsertUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusUpsertUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
