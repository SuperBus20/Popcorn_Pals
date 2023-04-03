import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IUser } from '../Interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Router } from '@angular/router';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
})
export class SearchUserComponent implements OnInit {
  public users: IUser[]|null = null;
  public searchName: string=''
  public userToView!: IUser;

  constructor(
     private api: ApiService
    , private router: Router
    , private route:ActivatedRoute)
    {}

  searchUsers() {
    this.api.getUserByName(this.searchName).subscribe(
      (response) => {
        this.userToView = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadUserProfile(user: IUser) {
    this.api.userToView=user;

    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/view-user']);
    });
  }
  ngOnInit(): void {
    this.api.getAllUsers().subscribe(x => this.users = x)


  }
}
