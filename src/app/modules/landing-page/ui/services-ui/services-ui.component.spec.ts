import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesUiComponent } from './services-ui.component';

describe('ServicesUiComponent', () => {
  let component: ServicesUiComponent;
  let fixture: ComponentFixture<ServicesUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
