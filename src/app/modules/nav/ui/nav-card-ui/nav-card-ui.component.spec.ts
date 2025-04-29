import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCardUiComponent } from './nav-card-ui.component';

describe('NavCardUiComponent', () => {
  let component: NavCardUiComponent;
  let fixture: ComponentFixture<NavCardUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavCardUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavCardUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
