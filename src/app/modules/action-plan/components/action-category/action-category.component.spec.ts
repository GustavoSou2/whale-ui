import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionCategoryComponent } from './action-category.component';

describe('ActionCategoryComponent', () => {
  let component: ActionCategoryComponent;
  let fixture: ComponentFixture<ActionCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
