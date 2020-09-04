import { TestBed } from '@angular/core/testing';

import { ActionsResolverService } from './actions-resolver.service';

describe('ActionsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionsResolverService = TestBed.get(ActionsResolverService);
    expect(service).toBeTruthy();
  });
});
