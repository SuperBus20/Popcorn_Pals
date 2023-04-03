import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IUser } from '../Interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
})
export class SearchUserComponent implements OnInit {
  public users!: IUser[];
  public searchName!: string;
  public userToView!: IUser;

  constructor(private api: ApiService, private router: Router) {}

  // searchUsers() {
  //   this.api.getUserByName(this.searchName).subscribe(
  //     (response) => {
  //       this.users = response;
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  loadUserProfile(user: IUser) {
    // this.api.userToView=user;
    this.router.navigate(['/view-user'],
    {state: {data: user}
  });
  }
  ngOnInit(): void {
    this.api.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
