import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubitemCardComponent } from './subitem-card.component';

describe('SubitemCardComponent', () => {
  let component: SubitemCardComponent;
  let fixture: ComponentFixture<SubitemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubitemCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubitemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
