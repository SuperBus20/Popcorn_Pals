import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { IUser } from '../Interfaces/user';
import { Router } from '@angular/router';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
})
export class SearchUserComponent {
  public users!: IUser[];
  public searchName!: string;
  public userToView!: IUser;

  constructor(private api: ApiService, private router: Router) {}

  searchUsers() {
    this.api.getUserByName(this.searchName).subscribe(
      (response) => {
        this.users = response;
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
}
