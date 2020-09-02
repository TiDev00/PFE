import { TestBed } from '@angular/core/testing';
import { ApplicationService } from './application.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApplicationService', () => {
  let service: ApplicationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApplicationService]
    });

    service = TestBed.get(ApplicationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
