import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaUiComponent } from './cta-ui.component';

describe('CtaUiComponent', () => {
  let component: CtaUiComponent;
  let fixture: ComponentFixture<CtaUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtaUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
