import { Component, OnInit } from '@angular/core';
import { IUser } from '../Interfaces/user';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';
import { ApiService } from '../api.service';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-follow-user',
  templateUrl: './follow-user.component.html',
  styleUrls: ['./follow-user.component.css']
})

export class FollowUserComponent implements OnInit{

  constructor(private api: ApiService) { }
  userFollowers: any;
  followingUsers: any;
  loggedInUser: ILoggedInUser|null = null
  userToView : IUser | null = null;
  isLoggedInAlsoUserToView: boolean = false;
  profileToView: any;
  userFollowingCount: number = 0;
  userFollowersCount: number = 0;

  ngOnInit() {
    this.api.loggedInEvent.subscribe((x) => this.loggedInUser = x);
    this.userToView = this.api.userToView

    if(this.loggedInUser?.User.userId == this.userToView?.userId){
      this.isLoggedInAlsoUserToView = true;
    }
    this.setProfileToView();
    this.followers();
    this.following();
  }

  setProfileToView()
  {
    if  (this.isLoggedInAlsoUserToView)
    {
      this.profileToView = this.loggedInUser!.User;
    }
    else (!this.isLoggedInAlsoUserToView)
    {
      this.profileToView = this.userToView;
    }
  }

  // Follow Profiles //
  followers(){
    this.api.getFollowers(this.profileToView.userId).subscribe((response) => {this.userFollowers = response;});
    this.userFollowersCount = this.userFollowers.length;
  }

  following(){
    this.api.getFollowing(this.profileToView.userId).subscribe((response) => {this.followingUsers = response;});
    this.userFollowingCount = this.followingUsers.length;
  }

  follow(userToFollow: number){
    this.api.followUser(this.loggedInUser!.User.userId, userToFollow);
  }

  unfollow (userToUnfollow: number){
    this.api.unfollowUser(this.loggedInUser!.User.userId, userToUnfollow);
  }

  isFollowing(id: number){
    this.api.isFollowingUser(this.loggedInUser!.User.userId, id)
  }

}
