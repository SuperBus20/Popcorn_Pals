import { Component, OnInit } from '@angular/core';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';
import { ApiService } from '../api.service';
import { IUser } from '../Interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-follow-user',
  templateUrl: './follow-view-user.component.html',
  styleUrls: ['./follow-view-user.component.css'],
})
export class FollowUserComponent implements OnInit {
  constructor(private api: ApiService, private router: Router) {}
  userFollowers: any;
  followingUsers: any;
  loggedInUser: ILoggedInUser | null = null;
  userToView: any;
  userFollowingCount: number = 0;
  userFollowersCount: number = 0;
  amIFollowing!: boolean;

  followUser(userIdToFollow:any) {
    this.amIFollowing = true;
    this.follow(userIdToFollow);
  }
  unfollowUser(userIdToUnfollow:any) {
    this.amIFollowing = false;
    this.unfollow(userIdToUnfollow);
  }

  ngOnInit() {
    this.loggedInUser = this.api.giveCurrentUser();
    this.userToView = this.api.userToView;

    this.followers();
    this.followings();
    this.isFollowing(this.userToView.userId);
    console.log(this.amIFollowing)


    this.api.refreshNeeded$.subscribe(() => {
    this.loggedInUser = this.api.giveCurrentUser();
    this.userToView = this.api.userToView;

    this.followers();
    this.followings();
    this.isFollowing(this.userToView.userId);
    console.log(this.amIFollowing)
    });
  }

  loadUserProfile(user: IUser) {
    this.api.userToView = user;

    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/view-user']);
    });
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
    this.api.isFollowingUser(this.loggedInUser!.User.userId, id).subscribe(response => {
      this.amIFollowing = <boolean>response;
    });
  }

}
