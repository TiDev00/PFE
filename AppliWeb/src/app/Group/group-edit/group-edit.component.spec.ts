import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GroupEditComponent } from './group-edit.component';
import { GroupService } from '../group.service';

describe('GroupEditComponent', () => {
  let component: GroupEditComponent;
  let fixture: ComponentFixture<GroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupEditComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [GroupService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
