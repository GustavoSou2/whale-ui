import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipseenComponent } from './tipseen.component';

describe('TipseenComponent', () => {
  let component: TipseenComponent;
  let fixture: ComponentFixture<TipseenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipseenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipseenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
