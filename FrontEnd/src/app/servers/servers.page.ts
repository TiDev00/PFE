import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-servers',
  templateUrl: './servers.page.html',
  styleUrls: ['./servers.page.scss'],
})
export class ServersPage implements OnInit {

  application;

  constructor(private authenticationService:AuthenticationService, private route: ActivatedRoute) { }


  ngOnInit() {
      this.application = this.route.snapshot.data['application']
  }

}
