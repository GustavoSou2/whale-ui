import { TestBed } from '@angular/core/testing';

import { ExecutionReportsService } from '../execution-reports.service';

describe('ExecutionReportsService', () => {
  let service: ExecutionReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecutionReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
