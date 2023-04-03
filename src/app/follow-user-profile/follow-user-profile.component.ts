import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';

@Component({
  selector: 'app-follow-user-profile',
  templateUrl: './follow-user-profile.component.html',
  styleUrls: ['./follow-user-profile.component.css']
})
export class FollowUserProfileComponent implements OnInit{
  constructor(private api: ApiService) {}
  userFollowers: any;
  followingUsers: any;
  loggedInUser: ILoggedInUser | null = null;
  userFollowingCount: number = 0;
  userFollowersCount: number = 0;

  ngOnInit() {
    this.loggedInUser = this.api.giveCurrentUser();
    this.followers();
    this.following();
  }

  followers() {
    this.api.getFollowers(this.loggedInUser!.User.userId).subscribe((response) => {
      this.userFollowers = response;
      this.userFollowersCount = this.userFollowers.length;
    });
  }
  
  following() {
    this.api.getFollowing(this.loggedInUser!.User.userId).subscribe((response) => {
      this.followingUsers = response;
      this.userFollowingCount = this.followingUsers.length;
    });
  }
}