import { TestBed } from '@angular/core/testing';

import { ProcessesResolverService } from './processes-resolver.service';

describe('ProcessesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessesResolverService = TestBed.get(ProcessesResolverService);
    expect(service).toBeTruthy();
  });
});
