import { TestBed } from '@angular/core/testing';

import { ServersResolveService } from './servers-resolve.service';

describe('ServersResolveService', () => {
  let service: ServersResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServersResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
