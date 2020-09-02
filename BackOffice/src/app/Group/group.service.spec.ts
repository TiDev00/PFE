import { TestBed } from '@angular/core/testing';
import { GroupService } from './group.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('GroupService', () => {
  let service: GroupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GroupService]
    });

    service = TestBed.get(GroupService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
