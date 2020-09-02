import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationEditComponent } from './application-edit.component';
import { ApplicationService } from '../application.service';

describe('ApplicationEditComponent', () => {
  let component: ApplicationEditComponent;
  let fixture: ComponentFixture<ApplicationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationEditComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [ApplicationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
