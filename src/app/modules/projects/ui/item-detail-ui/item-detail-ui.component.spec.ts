import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailUiComponent } from './item-detail-ui.component';

describe('ItemDetailUiComponent', () => {
  let component: ItemDetailUiComponent;
  let fixture: ComponentFixture<ItemDetailUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDetailUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDetailUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
