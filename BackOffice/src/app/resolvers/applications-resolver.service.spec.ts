import { TestBed } from '@angular/core/testing';

import { ApplicationsResolverService } from './applications-resolver.service';

describe('ApplicationsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationsResolverService = TestBed.get(ApplicationsResolverService);
    expect(service).toBeTruthy();
  });
});
