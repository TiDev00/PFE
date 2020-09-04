import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LogEditComponent } from './log-edit.component';
import { LogService } from '../log.service';

describe('LogEditComponent', () => {
  let component: LogEditComponent;
  let fixture: ComponentFixture<LogEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogEditComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [LogService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
