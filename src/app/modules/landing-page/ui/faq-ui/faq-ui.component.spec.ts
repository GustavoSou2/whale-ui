import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqUiComponent } from './faq-ui.component';

describe('FaqUiComponent', () => {
  let component: FaqUiComponent;
  let fixture: ComponentFixture<FaqUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
