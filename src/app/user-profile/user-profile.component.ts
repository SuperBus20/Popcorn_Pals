import { Component } from '@angular/core';
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

  constructor(private Api:ApiService){}

  users: any;
  userProfile: any;
  userName: any;
  password: any;
  userpic: any;
  userbio: any;

 getProfile(User: IUser) {
    this.userProfile.getUser();
 } 
 
 updateProfile(UserName: string, form: NgForm) {
  let newUser: IUser = {
    UserName: form.value.userName,
    UserId: 0,
    Password: '',
    UserRating: 0,
    UserPic: '',
    UserBio: ''
  }

  this.users.updateProfile(form).subscribe(
  () => {});

  form.resetForm();
 }



}

