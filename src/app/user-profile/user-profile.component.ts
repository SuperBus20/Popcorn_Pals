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
  
  constructor(private api: ApiService) {
    // this.loggedInUser = this.api.loggedInUser;
  }

  ngOnInit() {
    this.api.loggedInEvent.subscribe((x) => this.loggedInUser = x);
  }

  userName: string = "";
  userId: number = -1;
  password: string = "";
  userPic: string = "";
  userBio: string = "";

  getProfile(User: IUser) {
    this.api.getUser(User);
  }

}

