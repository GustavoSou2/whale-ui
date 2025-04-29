import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesUiComponent } from './roles-ui.component';

describe('RolesUiComponent', () => {
  let component: RolesUiComponent;
  let fixture: ComponentFixture<RolesUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
