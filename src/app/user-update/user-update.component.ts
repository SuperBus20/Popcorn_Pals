import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';
import { IUser } from '../Interfaces/user';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {

  constructor(private api: ApiService) { }

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
  loggedInUser: ILoggedInUser|null = this.api.loggedInUser


  updateProfile(form: NgForm) {
    let newUser: IUser = {
      userName: form.value.userName,
      password: form.value.userPassword,
      UserRating: this.userRating.disable,
      userPic: form.value.userPic,
      userBio: form.value.userBio,
      userId: form.value.userId
    }

    this.users.updateProfile(newUser).subscribe(
      () => { });

    form.resetForm();
  }

}
