import { TestBed } from '@angular/core/testing';

import { GroupResolverService } from './groups-resolver.service';

describe('GroupResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupResolverService = TestBed.get(GroupResolverService);
    expect(service).toBeTruthy();
  });
});
