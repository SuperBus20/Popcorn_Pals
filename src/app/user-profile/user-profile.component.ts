import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser } from '../Interfaces/user';
import { IUserReview } from '../Interfaces/user-review';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {

  constructor(private Api: ApiService) {}

  users: any;
  userProfile: any;
  userName: string = "";
  userId: number = -1;
  password: string = "";
  userPic: string = "";
  userBio: string = "";
  userToFollow: any;
  follower: any;

  getProfile(User: IUser) {
    this.Api.getUser(User);
  }

  ngOnInit(): void {
    this.getProfile;

    this.follow(4,5); //TEST DATA
  }

// Profile Mgmt //
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

// Follow Profiles //
  follow(userToFollow: number, follower:number) {
    this.Api.followUser(userToFollow, follower).subscribe(
      () => {}
    )
  }


  updateProfile(form: NgForm) {
    let newUser: IUser = {
      UserName: form.value.userName,
      UserId: this.userId.disable,
      Password: form.value.userPassword,
      UserRating: this.userRating.disable,
      UserPic: form.value.userPic,
      UserBio: form.value.userBio,
    };

    this.Api.updateProfile(newUser);

    form.resetForm();
  }
}
