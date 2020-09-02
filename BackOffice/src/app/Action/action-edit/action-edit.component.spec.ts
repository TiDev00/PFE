import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActionEditComponent } from './action-edit.component';
import { ActionService } from '../action.service';

describe('ActionEditComponent', () => {
  let component: ActionEditComponent;
  let fixture: ComponentFixture<ActionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionEditComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [ActionService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
