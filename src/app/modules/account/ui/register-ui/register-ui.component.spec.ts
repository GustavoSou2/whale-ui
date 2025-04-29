import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUiComponent } from './register-ui.component';

describe('RegisterUiComponent', () => {
  let component: RegisterUiComponent;
  let fixture: ComponentFixture<RegisterUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
