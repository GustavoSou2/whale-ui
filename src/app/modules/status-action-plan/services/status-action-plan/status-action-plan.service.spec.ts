import { TestBed } from '@angular/core/testing';

import { StatusActionPlanService } from './status-action-plan.service';

describe('StatusActionPlanService', () => {
  let service: StatusActionPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusActionPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
