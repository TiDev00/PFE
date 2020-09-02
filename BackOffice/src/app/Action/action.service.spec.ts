import { TestBed } from '@angular/core/testing';
import { ActionService } from './action.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ActionService', () => {
  let service: ActionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActionService]
    });

    service = TestBed.get(ActionService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
