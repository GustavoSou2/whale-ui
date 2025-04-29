import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPlansUiComponent } from './pricing-plans-ui.component';

describe('PricingPlansUiComponent', () => {
  let component: PricingPlansUiComponent;
  let fixture: ComponentFixture<PricingPlansUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingPlansUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingPlansUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
