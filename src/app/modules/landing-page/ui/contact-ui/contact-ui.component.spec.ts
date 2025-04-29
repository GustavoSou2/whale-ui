import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUiComponent } from './contact-ui.component';

describe('ContactUiComponent', () => {
  let component: ContactUiComponent;
  let fixture: ComponentFixture<ContactUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
