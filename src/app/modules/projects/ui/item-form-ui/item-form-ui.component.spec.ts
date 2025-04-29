import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFormUiComponent } from './item-form-ui.component';

describe('ItemFormUiComponent', () => {
  let component: ItemFormUiComponent;
  let fixture: ComponentFixture<ItemFormUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemFormUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemFormUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
