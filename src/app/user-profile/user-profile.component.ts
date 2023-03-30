import { Component, OnInit } from '@angular/core';
import { IUser } from '../Interfaces/user';
import { IUserReview } from '../Interfaces/user-review';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent {

  constructor(private api: ApiService) { }
  
  loggedInUser = this.api.loggedInUser
  user = this.loggedInUser.User;
  userProfile: any;
  userToFollow: any;
  follower: any;

ngOnInit() 
{
  this.api.onComponentLoad();
}

  // Follow Profiles //

  usersFollowingUser(user: IUser) {
    let id = user.userId
    this.api.getUserFollowers(id);
  }

  usersFollowedByUser(user: IUser) {
    let id = user.userId
    this.api.getUsersFollowedByUser(id);
  }

  follow(userId: number, userToFollow: number) {
    this.api.followUser(userId, userToFollow);
  }
  

}

