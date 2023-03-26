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
  follower: any;

  getProfile(User: IUser) {
    this.Api.getUser(User);
  }

      // newUser1: IUser = {
      // userName: "NLycette",
      // UserId: 3,
      // password: "password",
      // UserRating: 4,
      // UserPic: "string",
      // UserBio: "bio"
      // }

      // newUser2: IUser = {
      //   userName: "NLycette",
      //   UserId: 4,
      //   password: "Pass",
      //   UserRating: 3,
      //   UserPic: "string2",
      //   UserBio: "bio2"
      //   }
    


  ngOnInit(): void {
    this.getProfile;
    this.follow(4,5);
  }


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

  follow(userToFollow: number, follower:number) {
    this.Api.followUser(userToFollow, follower).subscribe(
      () => {}
    )
  }



}

