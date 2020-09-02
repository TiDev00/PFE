import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommandEditComponent } from './command-edit.component';
import { CommandService } from '../command.service';

describe('CommandEditComponent', () => {
  let component: CommandEditComponent;
  let fixture: ComponentFixture<CommandEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommandEditComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [CommandService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
