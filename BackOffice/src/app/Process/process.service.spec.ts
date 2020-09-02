import { TestBed } from '@angular/core/testing';
import { ProcessService } from './process.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProcessService', () => {
  let service: ProcessService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcessService]
    });

    service = TestBed.get(ProcessService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
