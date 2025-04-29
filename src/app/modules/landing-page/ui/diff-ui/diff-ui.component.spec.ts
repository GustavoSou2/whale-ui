import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffUiComponent } from './diff-ui.component';

describe('DiffUiComponent', () => {
  let component: DiffUiComponent;
  let fixture: ComponentFixture<DiffUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiffUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiffUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
