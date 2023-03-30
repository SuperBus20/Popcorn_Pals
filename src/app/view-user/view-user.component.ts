import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { IUser } from '../Interfaces/user';
import { SearchUserComponent } from '../search-user/search-user.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {
  constructor(private api: ApiService) { }
  
  loggedInUser=this.api.loggedInUser
  user = this.api.userToView
  userProfile: any;
  userToFollow: any;
  follower: any;
  
}


