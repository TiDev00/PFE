import { TestBed } from '@angular/core/testing';

import { ProcessResolveService } from './process-resolve.service';

describe('ProcessResolveService', () => {
  let service: ProcessResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
