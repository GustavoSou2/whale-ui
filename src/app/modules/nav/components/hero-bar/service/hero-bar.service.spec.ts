import { TestBed } from '@angular/core/testing';

import { HeroBarService } from './hero-bar.service';

describe('HeroBarService', () => {
  let service: HeroBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
