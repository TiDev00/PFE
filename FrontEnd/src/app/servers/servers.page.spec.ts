import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServersPage } from './servers.page';

describe('ServersPage', () => {
  let component: ServersPage;
  let fixture: ComponentFixture<ServersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
