import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubItemFormUiComponent } from './sub-item-form-ui.component';

describe('SubItemFormUiComponent', () => {
  let component: SubItemFormUiComponent;
  let fixture: ComponentFixture<SubItemFormUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubItemFormUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubItemFormUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
