import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesUpsertUiComponent } from './roles-upsert-ui.component';

describe('RolesUpsertUiComponent', () => {
  let component: RolesUpsertUiComponent;
  let fixture: ComponentFixture<RolesUpsertUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesUpsertUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesUpsertUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
