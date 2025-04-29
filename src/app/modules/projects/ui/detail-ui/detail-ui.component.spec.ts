import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUiComponent } from './detail-ui.component';

describe('DetailUiComponent', () => {
  let component: DetailUiComponent;
  let fixture: ComponentFixture<DetailUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
