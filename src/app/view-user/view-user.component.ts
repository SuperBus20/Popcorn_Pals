import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { ILoggedInUser } from '../Interfaces/LoggedinUser';
import { IUser } from '../Interfaces/user';
import { SearchUserComponent } from '../search-user/search-user.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  constructor(private api: ApiService, private route:ActivatedRoute) { }

  loggedInUser: ILoggedInUser | null = null;
  user = this.api.userToView
  userName: any;
  userProfile: any;
  userToFollow: any;
  follower: any;

  ngOnInit() {
    this.api.loggedInEvent.subscribe((x) => this.loggedInUser = x);
    this.userName = this.route.snapshot.paramMap.get('user');
    this.api.getUserByName(this.userName).subscribe((x) => this.userProfile = x);
  }

}


