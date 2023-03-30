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
  loggedInUser: ILoggedInUser|null = this.Api.loggedInUser

  getProfile(User: IUser) {
    this.Api.getUser(User);
  }

  ngOnInit(): void {
    this.getProfile;
  }

  // Profile Mgmt //

  // TODO: Figure out where this logic should live - in user profile or in another component specifically for managing data related to a user profile
  // updateProfile(form: NgForm) {
  //   let newUser: IUser = {
  //     userName: form.value.userName,
  //     password: form.value.userPassword,
  //     UserRating: this.userRating.disable,
  //     UserPic: form.value.userPic,
  //     UserBio: form.value.userBio,
  //   }

  //   this.users.updateProfile(form).subscribe(
  //     () => { });

  //   form.resetForm();
  // }
}

