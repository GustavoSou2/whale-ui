import { TestBed } from '@angular/core/testing';

import { TapBarService } from './tap-bar.service';

describe('TapBarService', () => {
  let service: TapBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TapBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
