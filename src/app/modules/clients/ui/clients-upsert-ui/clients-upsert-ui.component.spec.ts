import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsUpsertUiComponent } from './clients-upsert-ui.component';

describe('ClientsUpsertUiComponent', () => {
  let component: ClientsUpsertUiComponent;
  let fixture: ComponentFixture<ClientsUpsertUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsUpsertUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsUpsertUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
