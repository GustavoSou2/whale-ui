import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageUiComponent } from './landing-page-ui.component';

describe('LandingPageUiComponent', () => {
  let component: LandingPageUiComponent;
  let fixture: ComponentFixture<LandingPageUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPageUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
