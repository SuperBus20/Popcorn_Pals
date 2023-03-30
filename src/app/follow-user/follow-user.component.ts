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


  ngOnInit(): void{
     //this.following(10);
     //this.followers(5);
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

  isFollowing(userId:number){
    this.Api.isFollowingUser(userId);
  }
  






}
