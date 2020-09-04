import {Component, OnInit} from '@angular/core';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html',
  animations:[
    trigger('fade',[
      transition('void=>*', [
        style({opacity:0}),
        animate(2000)
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit{

  private sidebarVisible: boolean = false;
  isLoggedIn$: Observable<boolean>;   

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.loginService.isLoggedIn; 
  }

  sidebarToggle() {
    var body = document.getElementsByTagName('body')[0];

    if (this.sidebarVisible == false) {
      body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }

  logout(){
    this.loginService.logout()
  }
}
