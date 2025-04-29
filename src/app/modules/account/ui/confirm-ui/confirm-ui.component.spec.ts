import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmUiComponent } from './confirm-ui.component';

describe('ConfirmUiComponent', () => {
  let component: ConfirmUiComponent;
  let fixture: ComponentFixture<ConfirmUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
