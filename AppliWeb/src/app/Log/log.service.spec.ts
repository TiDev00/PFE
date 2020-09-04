import { TestBed } from '@angular/core/testing';
import { LogService } from './log.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LogService', () => {
  let service: LogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LogService]
    });

    service = TestBed.get(LogService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
