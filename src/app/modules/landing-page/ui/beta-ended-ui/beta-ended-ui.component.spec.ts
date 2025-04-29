import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetaEndedUiComponent } from './beta-ended-ui.component';

describe('BetaEndedUiComponent', () => {
  let component: BetaEndedUiComponent;
  let fixture: ComponentFixture<BetaEndedUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetaEndedUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetaEndedUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
