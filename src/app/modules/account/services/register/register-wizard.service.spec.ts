import { TestBed } from '@angular/core/testing';

import { RegisterWizardService } from './register-wizard.service';

describe('RegisterWizardService', () => {
  let service: RegisterWizardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterWizardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
