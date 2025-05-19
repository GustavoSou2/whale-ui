import { TestBed } from '@angular/core/testing';

import { PreLaunchService } from './pre-launch.service';

describe('PreLaunchService', () => {
  let service: PreLaunchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreLaunchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
