import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialProofUiComponent } from './social-proof-ui.component';

describe('SocialProofUiComponent', () => {
  let component: SocialProofUiComponent;
  let fixture: ComponentFixture<SocialProofUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialProofUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialProofUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
