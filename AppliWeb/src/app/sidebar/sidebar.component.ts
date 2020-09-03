import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
  animations:[
    trigger('fade',[
      transition('void=>*', [
        style({opacity:0}),
        animate(2000)
      ])
    ])
  ]
})

export class SidebarComponent implements OnInit{

  isLoggedIn$: Observable<boolean>;   

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.loginService.isLoggedIn; 
  }
}
