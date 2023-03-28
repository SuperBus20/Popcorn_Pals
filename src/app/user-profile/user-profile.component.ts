import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser } from '../Interfaces/user';
import { IUserReview } from '../Interfaces/user-review';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent {

  constructor(private Api: ApiService) { }

  users: any;
  userProfile: any;
  userName: string = "";
  userId: number = -1;
  password: string = "";
  userPic: string = "";
  userBio: string = "";
  userToFollow: any;
  userRating: any;
  follower: any;

  getProfile(User: IUser) {
    this.Api.getUser(User);
  }

  ngOnInit(): void {
    this.getProfile;
    console.log("stringOnInIt");
    this.follow(4, 5);
  }

  // Profile Mgmt // 

  // TODO: Figure out where this logic should live - in user profile or in another component specifically for managing data related to a user profile
  updateProfile(form: NgForm) {
    let newUser: IUser = {
      userName: form.value.userName,
      password: form.value.userPassword,
      UserRating: this.userRating.disable,
      UserPic: form.value.userPic,
      UserBio: form.value.userBio,
      UserId: form.value.UserId
    }

    this.users.updateProfile(form).subscribe(
      () => { });

    form.resetForm();
  }


  // Follow Profiles //

  usersFollowingUser(user: IUser) {
    let id = user.UserId
    this.Api.getUserFollowers(id);
  }

  usersFollowedByUser(user: IUser) {
    let id = user.UserId
    this.Api.getUsersFollowedByUser(id);
  }

  follow(userId: number, userToFollow: number) {
    this.Api.followUser(userId, userToFollow);
  }
  

}

