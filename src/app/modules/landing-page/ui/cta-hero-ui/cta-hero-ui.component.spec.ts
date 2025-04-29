import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaHeroUiComponent } from './cta-hero-ui.component';

describe('CtaHeroUiComponent', () => {
  let component: CtaHeroUiComponent;
  let fixture: ComponentFixture<CtaHeroUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaHeroUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtaHeroUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
