import { TestBed } from '@angular/core/testing';
import { CommandService } from './command.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CommandService', () => {
  let service: CommandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommandService]
    });

    service = TestBed.get(CommandService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
