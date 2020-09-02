import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActionListComponent } from './action-list.component';
import { ActionService } from '../action.service';

describe('ActionListComponent', () => {
  let component: ActionListComponent;
  let fixture: ComponentFixture<ActionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionListComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [ActionService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
