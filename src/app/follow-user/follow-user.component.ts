import { Component, OnInit } from '@angular/core';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';
import { ApiService } from '../api.service';
import { IUser } from '../Interfaces/user';

@Component({
  selector: 'app-follow-user',
  templateUrl: './follow-user.component.html',
  styleUrls: ['./follow-user.component.css'],
})
export class FollowUserComponent implements OnInit {
  constructor(private api: ApiService) {}
  userFollowers: any;
  followingUsers: any;
  loggedInUser: ILoggedInUser | null = null;
  userToView: any;
  userFollowingCount: number = 0;
  userFollowersCount: number = 0;

  ngOnInit() {
    this.loggedInUser = this.api.giveCurrentUser();
    this.userToView = this.api.userToView;

    this.followers();
    this.followings();
  }

  // Follow Profiles //
  followers() {
    this.api.getFollowers(this.userToView.userId).subscribe((response) => {
      this.userFollowers = response;
      this.userFollowersCount = this.userFollowers.length;
    });
  }

  followings() {
    this.api.getFollowing(this.userToView.userId).subscribe((response) => {
      this.followingUsers = response;
      this.userFollowingCount = this.followingUsers.length;
    });
  }

  follow(userToFollow: number) {
    this.api.followUser(this.loggedInUser!.User.userId, userToFollow);
  }

  unfollow(userToUnfollow: number) {
    this.api.unfollowUser(this.loggedInUser!.User.userId, userToUnfollow);
  }

  isFollowing(id: number) {
    this.api.isFollowingUser(this.loggedInUser!.User.userId, id);
  }
}
