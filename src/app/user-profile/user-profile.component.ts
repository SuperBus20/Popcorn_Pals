import { Component, OnInit } from '@angular/core';
import { IUser } from '../Interfaces/user';
import { IUserReview } from '../Interfaces/user-review';
import { ApiService } from '../api.service';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

  loggedInUser: ILoggedInUser | null = null;
  userProfile: any;
  userToFollow: any;
  follower: any;
  user:IUser | null = null;

  constructor(private api: ApiService) {
    // this.loggedInUser = this.api.loggedInUser;
  }

  ngOnInit() {
    // this.api.loggedInEvent.subscribe((x) => this.loggedInUser = x);
    this.api.loggedInEvent.subscribe(
      (x) => {this.loggedInUser = x as ILoggedInUser
        this.user=x.User;});
  }

  userName: string = "";
  userId: number = -1;
  password: string = "";
  userPic: string = "";
  userBio: string = "";

  getProfile(User: IUser) {
    this.api.getUser(User);

  }

  // Profile Mgmt // //TODO: Do we need this?

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

