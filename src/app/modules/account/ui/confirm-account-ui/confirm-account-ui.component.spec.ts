import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAccountUiComponent } from './confirm-account-ui.component';

describe('ConfirmAccountUiComponent', () => {
  let component: ConfirmAccountUiComponent;
  let fixture: ComponentFixture<ConfirmAccountUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmAccountUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmAccountUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
