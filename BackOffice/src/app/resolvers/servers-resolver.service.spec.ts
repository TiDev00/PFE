import { TestBed } from '@angular/core/testing';

import { ServersResolverService } from './servers-resolver.service';

describe('ServersResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServersResolverService = TestBed.get(ServersResolverService);
    expect(service).toBeTruthy();
  });
});
