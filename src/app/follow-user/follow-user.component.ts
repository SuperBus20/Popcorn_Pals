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

export class FollowUserComponent {

  constructor(private Api: ApiService) { }
  userFollowers: any;
  followingUsers: any;
  loggedInUser: ILoggedInUser|null = this.Api.loggedInUser

  ngOnInit() {
    this.Api.loggedInEvent.subscribe((x) => this.loggedInUser = x);
  }

  // Follow Profiles //
  followers(id: any){
    this.Api.getFollowers(id).subscribe((response) => {this.userFollowers = response;});
  }

  following(id:any){
    this.Api.getFollowing(id).subscribe((response) => {this.followingUsers = response;});
  }

  follow(userId: number, userToFollow: number){
    this.Api.followUser(userId, userToFollow);
  }

  unfollow (userId: number, userToUnfollow: number){
    this.Api.unfollowUser(userId, userToUnfollow);
  }

  isFollowing(userId:number, id: number){
    this.Api.isFollowingUser(userId, id)
  }

}
