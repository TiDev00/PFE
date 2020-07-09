import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Observable<User[]>;

  constructor(private userService: UserService, 
              private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(){
    this.users = this.userService.getUsersList();
  }

  deleteUser(matricule: string){
    this.userService.deleteUser(matricule)
    .subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },

      error => console.log(error)
    )
  }

  userDetails(matricule: string){
    this.router.navigate(['user-details', matricule])
  }

}
