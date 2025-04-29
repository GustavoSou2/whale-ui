import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubItemFormComponent } from './sub-item-form.component';

describe('SubItemFormComponent', () => {
  let component: SubItemFormComponent;
  let fixture: ComponentFixture<SubItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubItemFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
