import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit{

  isLoggedIn$: Observable<boolean>;   

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.loginService.isLoggedIn; 
  }
}
